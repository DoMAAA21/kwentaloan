import { calculateMonthlyPayment, monthlyRateFromAnnual } from "./calculate-payment";
import type {
  ExtraPayment,
  LoanParams,
  ScheduleRow,
  ScheduleSummary,
} from "./types";

function paymentDateFor(startYear: number, startMonth: number, offset: number): Date {
  return new Date(startYear, startMonth - 1 + offset, 1);
}

function extrasForMonth(
  extras: ExtraPayment[],
  year: number,
  month: number,
): number {
  return extras
    .filter((entry) => entry.year === year && entry.month === month)
    .reduce((sum, entry) => sum + Math.max(0, entry.amount), 0);
}

export function buildAmortizationSchedule(params: LoanParams): ScheduleSummary {
  const {
    principal,
    termYears,
    annualRatePercent,
    startYear,
    startMonth,
    extraPayments,
  } = params;

  const plannedMonths = Math.round(termYears * 12);
  const monthlyRate = monthlyRateFromAnnual(annualRatePercent);
  const scheduledPayment = calculateMonthlyPayment(
    principal,
    annualRatePercent,
    plannedMonths,
  );

  const rows: ScheduleRow[] = [];
  let balance = principal;
  let paymentNumber = 0;
  let totalInterest = 0;
  let totalPaid = 0;

  const maxIterations = plannedMonths + 600;

  while (balance > 1e-8 && paymentNumber < maxIterations) {
    paymentNumber += 1;
    const offset = paymentNumber - 1;
    const date = paymentDateFor(startYear, startMonth, offset);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const openingBalance = balance;

    const interestPortion = monthlyRate === 0 ? 0 : openingBalance * monthlyRate;
    let principalFromPayment = scheduledPayment - interestPortion;
    let paymentAmount = scheduledPayment;

    if (principalFromPayment >= openingBalance - 1e-8) {
      principalFromPayment = openingBalance;
      paymentAmount = interestPortion + openingBalance;
    } else if (principalFromPayment < 0) {
      principalFromPayment = 0;
    }

    const extraRequested = extrasForMonth(extraPayments, year, month);
    const extraPrincipal = Math.min(
      extraRequested,
      Math.max(0, openingBalance - principalFromPayment),
    );

    let closingBalance = openingBalance - principalFromPayment - extraPrincipal;

    if (closingBalance < 1e-8) {
      closingBalance = 0;
      paymentAmount = interestPortion + principalFromPayment + extraPrincipal;
    } else if (extraPrincipal > 0) {
      paymentAmount = scheduledPayment + extraPrincipal;
    }

    totalInterest += interestPortion;
    totalPaid += paymentAmount;

    rows.push({
      paymentNumber,
      year,
      month,
      paymentDate: date,
      openingBalance,
      paymentAmount,
      interestPortion,
      principalPortion: principalFromPayment,
      extraPrincipal,
      closingBalance,
    });

    balance = closingBalance;
  }

  const lastRow = rows.at(-1);

  return {
    monthlyPayment: scheduledPayment,
    paymentCount: rows.length,
    totalInterest,
    totalPaid,
    payoffDate: lastRow ? lastRow.paymentDate : null,
    rows,
  };
}

export function aggregateAnnualSummary(
  rows: ScheduleRow[],
): import("./types").AnnualSummaryRow[] {
  const byYear = new Map<number, import("./types").AnnualSummaryRow>();

  for (const row of rows) {
    const existing = byYear.get(row.year) ?? {
      year: row.year,
      interestPaid: 0,
      principalPaid: 0,
      extraPrincipalPaid: 0,
      totalPayments: 0,
      endBalance: 0,
    };

    existing.interestPaid += row.interestPortion;
    existing.principalPaid += row.principalPortion;
    existing.extraPrincipalPaid += row.extraPrincipal;
    existing.totalPayments += row.paymentAmount;
    existing.endBalance = row.closingBalance;

    byYear.set(row.year, existing);
  }

  return [...byYear.values()].sort((a, b) => a.year - b.year);
}

export function compareSchedules(
  params: LoanParams,
): import("./types").ScheduleComparison {
  const baseline = buildAmortizationSchedule({ ...params, extraPayments: [] });
  const withExtras = buildAmortizationSchedule(params);

  return {
    baseline,
    withExtras,
    interestSaved: baseline.totalInterest - withExtras.totalInterest,
    paymentsSaved: baseline.paymentCount - withExtras.paymentCount,
    monthsSaved: baseline.paymentCount - withExtras.paymentCount,
  };
}

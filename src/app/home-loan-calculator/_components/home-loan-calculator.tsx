"use client";

import { useMemo, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  aggregateAnnualSummary,
  buildAmortizationSchedule,
  compareSchedules,
} from "@/lib/mortgage/build-schedule";
import { principalFromPayment } from "@/lib/mortgage/calculate-payment";
import {
  SAMPLE_AFFORDABILITY,
  SAMPLE_LOAN_FORM,
  createExtraPaymentId,
} from "@/lib/mortgage/defaults";
import { formatMonthYear, formatPeso, formatPercent } from "@/lib/mortgage/format";
import type { ExtraPayment } from "@/lib/mortgage/types";
import { parseLoanForm, type LoanFieldErrors } from "@/lib/mortgage/validate";
import { cn } from "@/lib/utils";
import {
  calculatorFieldClassName,
  calculatorLabelClassName,
} from "./field-styles";

const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

type ScheduleView = "monthly" | "annual";

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }
  return (
    <p className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

export function HomeLoanCalculator() {
  const [form, setForm] = useState(SAMPLE_LOAN_FORM);
  const [errors, setErrors] = useState<LoanFieldErrors>({});
  const [extraPayments, setExtraPayments] = useState<ExtraPayment[]>([]);
  const [scheduleView, setScheduleView] = useState<ScheduleView>("monthly");
  const [affordability, setAffordability] = useState(SAMPLE_AFFORDABILITY);
  const [extraDraft, setExtraDraft] = useState({
    month: SAMPLE_LOAN_FORM.startMonth,
    year: SAMPLE_LOAN_FORM.startYear,
    amount: "5000",
  });
  const [showAllDetails, setShowAllDetails] = useState(false);

  const parsed = useMemo(() => parseLoanForm(form), [form]);

  const comparison = useMemo(() => {
    if (!parsed.data) {
      return null;
    }
    const params = { ...parsed.data, extraPayments };
    if (extraPayments.length === 0) {
      const schedule = buildAmortizationSchedule(params);
      return {
        baseline: schedule,
        withExtras: schedule,
        interestSaved: 0,
        paymentsSaved: 0,
        monthsSaved: 0,
      };
    }
    return compareSchedules(params);
  }, [parsed.data, extraPayments]);

  const schedule = comparison?.withExtras ?? null;
  const annualRows = useMemo(
    () => (schedule ? aggregateAnnualSummary(schedule.rows) : []),
    [schedule],
  );

  const affordablePayment = useMemo(() => {
    const gross = Number(affordability.grossMonthlyIncome.replace(/,/g, ""));
    const debt = Number(affordability.monthlyDebt.replace(/,/g, "") || "0");
    const share = Number(affordability.housingSharePercent) / 100;
    if (!Number.isFinite(gross) || !Number.isFinite(share) || share <= 0) {
      return 0;
    }
    return Math.max(0, gross * share - (Number.isFinite(debt) ? debt : 0));
  }, [affordability]);

  const illustrativeLoan = useMemo(() => {
    if (!parsed.data || affordablePayment <= 0) {
      return 0;
    }
    return principalFromPayment(
      affordablePayment,
      parsed.data.annualRatePercent,
      Math.round(parsed.data.termYears * 12),
    );
  }, [affordablePayment, parsed.data]);

  function updateForm(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validateOnBlur() {
    const result = parseLoanForm(form);
    setErrors(result.errors);
  }

  function addExtraPayment() {
    const amount = Number(extraDraft.amount.replace(/,/g, ""));
    const year = Number(extraDraft.year);
    const month = Number(extraDraft.month);
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      return;
    }
    if (!Number.isFinite(year)) {
      return;
    }
    setExtraPayments((current) => [
      ...current,
      {
        id: createExtraPaymentId(),
        year,
        month,
        amount,
      },
    ]);
  }

  function removeExtra(id: string) {
    setExtraPayments((current) => current.filter((entry) => entry.id !== id));
  }

  const principalTotal = parsed.data?.principal ?? 0;
  const interestTotal = schedule?.totalInterest ?? 0;
  const totalCost = principalTotal + interestTotal;
  const interestShare =
    totalCost > 0 ? Math.min(100, (interestTotal / totalCost) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-base leading-relaxed text-muted-foreground sm:max-w-2xl">
          <strong className="font-semibold text-foreground">Sample data:</strong>{" "}
          {showAllDetails
            ? "The values below are an example only—not a bank offer or recommended rate."
            : "Change the numbers below to estimate your monthly payment."}
        </p>
        <Button
          type="button"
          variant="outline"
          className="h-11 shrink-0 px-4"
          aria-expanded={showAllDetails}
          aria-controls="calculator-advanced-sections"
          onClick={() => setShowAllDetails((open) => !open)}
        >
          {showAllDetails ? (
            <>
              <RiArrowUpSLine aria-hidden className="size-5" />
              Simple view
            </>
          ) : (
            <>
              <RiArrowDownSLine aria-hidden className="size-5" />
              Show all details
            </>
          )}
        </Button>
      </div>

      {!showAllDetails && schedule && parsed.data ? (
        <SimplePaymentHighlight
          monthlyPayment={schedule.monthlyPayment}
          termYears={parsed.data.termYears}
          loanAmount={parsed.data.principal}
          totalInterest={schedule.totalInterest}
        />
      ) : null}

      <div
        className={cn(
          "grid gap-8",
          showAllDetails &&
            "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start",
        )}
      >
        <section aria-labelledby="loan-inputs-heading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle id="loan-inputs-heading" className="text-lg">
                Loan details
              </CardTitle>
              <CardDescription className="text-base">
                Fixed-rate estimate. Insurance, taxes, and bank fees are not
                included.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="propertyPrice"
                  className={calculatorLabelClassName}
                >
                  Property price (₱)
                </Label>
                <Input
                  id="propertyPrice"
                  inputMode="decimal"
                  className={calculatorFieldClassName}
                  value={form.propertyPrice}
                  onChange={(event) =>
                    updateForm("propertyPrice", event.target.value)
                  }
                  onBlur={validateOnBlur}
                  aria-invalid={Boolean(errors.propertyPrice)}
                />
                <FieldError message={errors.propertyPrice} />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="downPayment"
                  className={calculatorLabelClassName}
                >
                  Down payment (₱)
                </Label>
                <Input
                  id="downPayment"
                  inputMode="decimal"
                  className={calculatorFieldClassName}
                  value={form.downPayment}
                  onChange={(event) =>
                    updateForm("downPayment", event.target.value)
                  }
                  onBlur={validateOnBlur}
                  aria-invalid={Boolean(errors.downPayment)}
                />
                <FieldError message={errors.downPayment} />
                {parsed.data ? (
                  <p className="text-base text-muted-foreground">
                    Loan amount (financed):{" "}
                    <span className="font-semibold text-foreground tabular-nums">
                      {formatPeso(parsed.data.principal, true)}
                    </span>
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="termYears"
                    className={calculatorLabelClassName}
                  >
                    Term (years)
                  </Label>
                  <Input
                    id="termYears"
                    inputMode="numeric"
                    className={calculatorFieldClassName}
                    value={form.termYears}
                    onChange={(event) =>
                      updateForm("termYears", event.target.value)
                    }
                    onBlur={validateOnBlur}
                    aria-invalid={Boolean(errors.termYears)}
                  />
                  <FieldError message={errors.termYears} />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="annualRatePercent"
                    className={calculatorLabelClassName}
                  >
                    Annual interest rate (%)
                  </Label>
                  <Input
                    id="annualRatePercent"
                    inputMode="decimal"
                    className={calculatorFieldClassName}
                    value={form.annualRatePercent}
                    onChange={(event) =>
                      updateForm("annualRatePercent", event.target.value)
                    }
                    onBlur={validateOnBlur}
                    aria-invalid={Boolean(errors.annualRatePercent)}
                  />
                  <FieldError message={errors.annualRatePercent} />
                </div>
              </div>

              {showAllDetails ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="startMonth"
                      className={calculatorLabelClassName}
                    >
                      Start month
                    </Label>
                    <select
                      id="startMonth"
                      className={cn(
                        calculatorFieldClassName,
                        "w-full rounded-lg border border-input bg-transparent px-2.5",
                      )}
                      value={form.startMonth}
                      onChange={(event) =>
                        updateForm("startMonth", event.target.value)
                      }
                      onBlur={validateOnBlur}
                    >
                      {MONTHS.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.startMonth} />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="startYear"
                      className={calculatorLabelClassName}
                    >
                      Start year
                    </Label>
                    <Input
                      id="startYear"
                      inputMode="numeric"
                      className={calculatorFieldClassName}
                      value={form.startYear}
                      onChange={(event) =>
                        updateForm("startYear", event.target.value)
                      }
                      onBlur={validateOnBlur}
                      aria-invalid={Boolean(errors.startYear)}
                    />
                    <FieldError message={errors.startYear} />
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {showAllDetails ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Extra principal payments</CardTitle>
              <CardDescription className="text-base">
                Optional lump sums applied to principal on the chosen month.
                Assumes no prepayment penalties—your lender may differ.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="extra-month" className={calculatorLabelClassName}>
                    Month
                  </Label>
                  <select
                    id="extra-month"
                    className={cn(
                      calculatorFieldClassName,
                      "w-full rounded-lg border border-input bg-transparent px-2.5",
                    )}
                    value={extraDraft.month}
                    onChange={(event) =>
                      setExtraDraft((current) => ({
                        ...current,
                        month: event.target.value,
                      }))
                    }
                  >
                    {MONTHS.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="extra-year" className={calculatorLabelClassName}>
                    Year
                  </Label>
                  <Input
                    id="extra-year"
                    inputMode="numeric"
                    className={calculatorFieldClassName}
                    value={extraDraft.year}
                    onChange={(event) =>
                      setExtraDraft((current) => ({
                        ...current,
                        year: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="extra-amount" className={calculatorLabelClassName}>
                    Amount (₱)
                  </Label>
                  <Input
                    id="extra-amount"
                    inputMode="decimal"
                    className={calculatorFieldClassName}
                    value={extraDraft.amount}
                    onChange={(event) =>
                      setExtraDraft((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <Button type="button" onClick={addExtraPayment}>
                Add extra payment
              </Button>
              {extraPayments.length > 0 ? (
                <ul className="space-y-2">
                  {extraPayments.map((entry) => (
                    <li
                      key={entry.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2"
                    >
                      <span className="text-base">
                        {MONTHS[entry.month - 1]?.label} {entry.year}:{" "}
                        {formatPeso(entry.amount)}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeExtra(entry.id)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </CardContent>
          </Card>
          ) : null}
        </section>

        {showAllDetails ? (
        <section aria-labelledby="summary-heading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle id="summary-heading" className="text-lg">
                Mortgage summary
              </CardTitle>
              <CardDescription className="text-base">
                Principal and interest only. Payments are modeled at month-end.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {schedule && parsed.data ? (
                <dl className="grid gap-4 sm:grid-cols-2">
                  <SummaryItem
                    label="Monthly payment (P&I)"
                    value={formatPeso(schedule.monthlyPayment)}
                  />
                  <SummaryItem
                    label="Number of payments"
                    value={String(schedule.paymentCount)}
                  />
                  <SummaryItem
                    label="Total interest"
                    value={formatPeso(schedule.totalInterest)}
                  />
                  <SummaryItem
                    label="Total paid"
                    value={formatPeso(schedule.totalPaid)}
                  />
                  <SummaryItem
                    label="Property price"
                    value={formatPeso(parsed.data.propertyPrice, true)}
                  />
                  <SummaryItem
                    label="Down payment"
                    value={formatPeso(parsed.data.downPayment, true)}
                  />
                  <SummaryItem
                    label="Loan amount"
                    value={formatPeso(parsed.data.principal, true)}
                  />
                  <SummaryItem
                    label="Estimated payoff"
                    value={
                      schedule.payoffDate
                        ? formatMonthYear(schedule.payoffDate)
                        : "—"
                    }
                  />
                </dl>
              ) : (
                <p className="text-base text-muted-foreground">
                  Fix the loan details above to see your estimate.
                </p>
              )}
              {comparison && comparison.interestSaved > 0 ? (
                <div className="mt-4 rounded-lg bg-primary/10 px-4 py-3 text-base">
                  <p>
                    Extra payments may save about{" "}
                    <strong>{formatPeso(comparison.interestSaved)}</strong> in
                    interest and finish about{" "}
                    <strong>{comparison.monthsSaved}</strong> months sooner
                    (estimate).
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Affordability estimator</CardTitle>
              <CardDescription className="text-base">
                Illustration only—banks use their own underwriting and may look
                at net income, credit, and other debts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gross-income" className={calculatorLabelClassName}>
                  Gross monthly income (₱)
                </Label>
                <Input
                  id="gross-income"
                  inputMode="decimal"
                  className={calculatorFieldClassName}
                  value={affordability.grossMonthlyIncome}
                  onChange={(event) =>
                    setAffordability((current) => ({
                      ...current,
                      grossMonthlyIncome: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="monthly-debt" className={calculatorLabelClassName}>
                    Other monthly debt (₱)
                  </Label>
                  <Input
                    id="monthly-debt"
                    inputMode="decimal"
                    className={calculatorFieldClassName}
                    value={affordability.monthlyDebt}
                    onChange={(event) =>
                      setAffordability((current) => ({
                        ...current,
                        monthlyDebt: event.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="housing-share" className={calculatorLabelClassName}>
                    Housing share of gross income (%)
                  </Label>
                  <Input
                    id="housing-share"
                    inputMode="decimal"
                    className={calculatorFieldClassName}
                    value={affordability.housingSharePercent}
                    onChange={(event) =>
                      setAffordability((current) => ({
                        ...current,
                        housingSharePercent: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <dl className="grid gap-3 rounded-lg border border-border bg-muted/30 p-4">
                <SummaryItem
                  label="Estimated affordable payment"
                  value={formatPeso(affordablePayment)}
                />
                <SummaryItem
                  label="Illustrative loan at this rate & term"
                  value={formatPeso(illustrativeLoan, true)}
                />
              </dl>
            </CardContent>
          </Card>
        </section>
        ) : null}
      </div>

      <div id="calculator-advanced-sections">
      {!showAllDetails ? (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="secondary"
            className="h-11 px-6"
            onClick={() => setShowAllDetails(true)}
          >
            <RiArrowDownSLine aria-hidden className="size-5" />
            Show amortization, charts &amp; more
          </Button>
        </div>
      ) : null}

      {showAllDetails && schedule && parsed.data ? (
        <section aria-labelledby="visualization-heading" className="space-y-4">
          <h2 id="visualization-heading" className="font-heading text-2xl font-bold">
            Principal vs interest
          </h2>
          <p className="text-base text-muted-foreground">
            Over the full modeled term, about {formatPercent(interestShare)} of
            principal-plus-interest goes to interest.
          </p>
          <div
            className="flex h-8 w-full overflow-hidden rounded-lg border border-border"
            role="img"
            aria-label={`Principal ${formatPeso(principalTotal)}, interest ${formatPeso(interestTotal)}`}
          >
            <div
              className="bg-primary transition-all"
              style={{ width: `${100 - interestShare}%` }}
              title={`Principal: ${formatPeso(principalTotal)}`}
            />
            <div
              className="bg-muted-foreground/40 transition-all"
              style={{ width: `${interestShare}%` }}
              title={`Interest: ${formatPeso(interestTotal)}`}
            />
          </div>
          <table className="w-full max-w-md text-base">
            <caption className="sr-only">
              Principal and interest totals
            </caption>
            <tbody>
              <tr>
                <th scope="row" className="py-1 text-left font-medium">
                  Principal
                </th>
                <td className="py-1 text-right">{formatPeso(principalTotal)}</td>
              </tr>
              <tr>
                <th scope="row" className="py-1 text-left font-medium">
                  Interest
                </th>
                <td className="py-1 text-right">{formatPeso(interestTotal)}</td>
              </tr>
            </tbody>
          </table>
        </section>
      ) : null}

      {showAllDetails && schedule ? (
        <section aria-labelledby="schedule-heading" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="schedule-heading" className="font-heading text-2xl font-bold">
              Amortization schedule
            </h2>
            <div
              className="inline-flex rounded-lg border border-border p-1"
              role="tablist"
              aria-label="Schedule view"
            >
              <ScheduleTab
                active={scheduleView === "monthly"}
                onClick={() => setScheduleView("monthly")}
                label="Monthly"
              />
              <ScheduleTab
                active={scheduleView === "annual"}
                onClick={() => setScheduleView("annual")}
                label="Annual"
              />
            </div>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {scheduleView === "monthly" ? (
              <table className="w-full min-w-[720px] border-collapse text-base">
                <caption className="sr-only">Monthly amortization schedule</caption>
                <thead>
                  <tr className="border-b border-border text-left">
                    <th scope="col" className="px-2 py-3 font-semibold">
                      #
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold">
                      Date
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Payment
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Interest
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Principal
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Extra
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.rows.map((row) => (
                    <tr key={row.paymentNumber} className="border-b border-border/60">
                      <td className="px-2 py-2">{row.paymentNumber}</td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        {formatMonthYear(row.paymentDate)}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {formatPeso(row.paymentAmount)}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {formatPeso(row.interestPortion)}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {formatPeso(row.principalPortion)}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {row.extraPrincipal > 0
                          ? formatPeso(row.extraPrincipal)
                          : "—"}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {formatPeso(row.closingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full min-w-[640px] border-collapse text-base">
                <caption className="sr-only">Annual amortization summary</caption>
                <thead>
                  <tr className="border-b border-border text-left">
                    <th scope="col" className="px-2 py-3 font-semibold">
                      Year
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Interest
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Principal
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Extra
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      Total paid
                    </th>
                    <th scope="col" className="px-2 py-3 font-semibold text-right">
                      End balance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {annualRows.map((row) => (
                    <tr key={row.year} className="border-b border-border/60">
                      <td className="px-2 py-2">{row.year}</td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {formatPeso(row.interestPaid)}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {formatPeso(row.principalPaid)}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {row.extraPrincipalPaid > 0
                          ? formatPeso(row.extraPrincipalPaid)
                          : "—"}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {formatPeso(row.totalPayments)}
                      </td>
                      <td className="px-2 py-2 text-right tabular-nums">
                        {formatPeso(row.endBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      ) : null}
      </div>
    </div>
  );
}

function SimplePaymentHighlight({
  monthlyPayment,
  termYears,
  loanAmount,
  totalInterest,
}: {
  monthlyPayment: number;
  termYears: number;
  loanAmount: number;
  totalInterest: number;
}) {
  return (
    <div className="rounded-xl border-2 border-primary/25 bg-primary/5 px-6 py-8 text-center">
      <p className="text-base text-muted-foreground">
        Estimated monthly payment (principal &amp; interest)
      </p>
      <p className="mt-2 font-heading text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
        {formatPeso(monthlyPayment)}
      </p>
      <dl className="mt-6 grid gap-3 text-base sm:grid-cols-3 sm:gap-4">
        <div>
          <dt className="text-muted-foreground">Loan amount</dt>
          <dd className="font-semibold tabular-nums">
            {formatPeso(loanAmount, true)}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Term</dt>
          <dd className="font-semibold">{termYears} years</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Total interest (estimate)</dt>
          <dd className="font-semibold tabular-nums">
            {formatPeso(totalInterest, true)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-lg font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function ScheduleTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        "rounded-md px-4 py-2 text-base font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted",
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

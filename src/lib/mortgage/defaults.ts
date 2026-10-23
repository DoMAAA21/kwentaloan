import type { ExtraPayment } from "./types";
import type { LoanFormValues } from "./validate";

/** Sample scenario only — not a current bank offer or recommendation. */
export const SAMPLE_LOAN_FORM: LoanFormValues = {
  propertyPrice: "3000000",
  downPayment: "0",
  termYears: "20",
  annualRatePercent: "7",
  startYear: "2026",
  startMonth: "1",
};

export const SAMPLE_AFFORDABILITY = {
  grossMonthlyIncome: "80000",
  monthlyDebt: "10000",
  housingSharePercent: "30",
};

export function createExtraPaymentId(): string {
  return crypto.randomUUID();
}

export const EMPTY_EXTRAS: ExtraPayment[] = [];

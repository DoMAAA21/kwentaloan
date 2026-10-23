export type LoanFieldErrors = Partial<
  Record<
    | "propertyPrice"
    | "downPayment"
    | "termYears"
    | "annualRatePercent"
    | "startYear"
    | "startMonth",
    string
  >
>;

export type LoanFormValues = {
  propertyPrice: string;
  downPayment: string;
  termYears: string;
  annualRatePercent: string;
  startYear: string;
  startMonth: string;
};

const MAX_RATE_PERCENT = 30;
const MAX_TERM_YEARS = 40;
const MIN_TERM_YEARS = 1;

function parseAmount(raw: string): number {
  return Number(raw.replace(/,/g, ""));
}

export function parseLoanForm(values: LoanFormValues): {
  data: {
    propertyPrice: number;
    downPayment: number;
    principal: number;
    termYears: number;
    annualRatePercent: number;
    startYear: number;
    startMonth: number;
  } | null;
  errors: LoanFieldErrors;
} {
  const errors: LoanFieldErrors = {};

  const propertyPrice = parseAmount(values.propertyPrice);
  if (!Number.isFinite(propertyPrice) || propertyPrice <= 0) {
    errors.propertyPrice = "Enter a property price greater than zero.";
  }

  const downPaymentRaw = values.downPayment.trim();
  const downPayment =
    downPaymentRaw === "" ? 0 : parseAmount(values.downPayment);
  if (!Number.isFinite(downPayment) || downPayment < 0) {
    errors.downPayment = "Down payment cannot be negative.";
  } else if (
    Number.isFinite(propertyPrice) &&
    propertyPrice > 0 &&
    downPayment >= propertyPrice
  ) {
    errors.downPayment = "Down payment must be less than the property price.";
  }

  const principal =
    Number.isFinite(propertyPrice) && Number.isFinite(downPayment)
      ? propertyPrice - downPayment
      : NaN;
  if (
    Number.isFinite(propertyPrice) &&
    Number.isFinite(downPayment) &&
    !errors.propertyPrice &&
    !errors.downPayment &&
    principal <= 0
  ) {
    errors.downPayment =
      "Loan amount must be greater than zero—lower the down payment or raise the property price.";
  }

  const termYears = Number(values.termYears);
  if (
    !Number.isFinite(termYears) ||
    termYears < MIN_TERM_YEARS ||
    termYears > MAX_TERM_YEARS
  ) {
    errors.termYears = `Enter a term between ${MIN_TERM_YEARS} and ${MAX_TERM_YEARS} years.`;
  }

  const annualRatePercent = Number(values.annualRatePercent);
  if (
    !Number.isFinite(annualRatePercent) ||
    annualRatePercent < 0 ||
    annualRatePercent > MAX_RATE_PERCENT
  ) {
    errors.annualRatePercent = `Enter a rate from 0% to ${MAX_RATE_PERCENT}%.`;
  }

  const startYear = Number(values.startYear);
  if (
    !Number.isFinite(startYear) ||
    startYear < 2000 ||
    startYear > 2100
  ) {
    errors.startYear = "Enter a valid loan start year (2000–2100).";
  }

  const startMonth = Number(values.startMonth);
  if (!Number.isInteger(startMonth) || startMonth < 1 || startMonth > 12) {
    errors.startMonth = "Choose a valid start month.";
  }

  if (Object.keys(errors).length > 0) {
    return { data: null, errors };
  }

  return {
    data: {
      propertyPrice,
      downPayment,
      principal,
      termYears,
      annualRatePercent,
      startYear,
      startMonth,
    },
    errors,
  };
}

export type ExtraPayment = {
  id: string;
  year: number;
  month: number;
  amount: number;
  note?: string;
};

export type LoanParams = {
  principal: number;
  termYears: number;
  annualRatePercent: number;
  startYear: number;
  startMonth: number;
  extraPayments: ExtraPayment[];
};

export type ScheduleRow = {
  paymentNumber: number;
  year: number;
  month: number;
  paymentDate: Date;
  openingBalance: number;
  paymentAmount: number;
  interestPortion: number;
  principalPortion: number;
  extraPrincipal: number;
  closingBalance: number;
};

export type ScheduleSummary = {
  monthlyPayment: number;
  paymentCount: number;
  totalInterest: number;
  totalPaid: number;
  payoffDate: Date | null;
  rows: ScheduleRow[];
};

export type AnnualSummaryRow = {
  year: number;
  interestPaid: number;
  principalPaid: number;
  extraPrincipalPaid: number;
  totalPayments: number;
  endBalance: number;
};

export type ScheduleComparison = {
  baseline: ScheduleSummary;
  withExtras: ScheduleSummary;
  interestSaved: number;
  paymentsSaved: number;
  monthsSaved: number;
};

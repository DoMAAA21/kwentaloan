export function monthlyRateFromAnnual(annualRatePercent: number): number {
  return annualRatePercent / 100 / 12;
}

/** Fixed-rate monthly principal-and-interest payment for `n` months. */
export function calculateMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  numberOfMonths: number,
): number {
  if (numberOfMonths <= 0 || principal <= 0) {
    return 0;
  }

  const monthlyRate = monthlyRateFromAnnual(annualRatePercent);

  if (monthlyRate === 0) {
    return principal / numberOfMonths;
  }

  const factor = Math.pow(1 + monthlyRate, numberOfMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
}

/** Loan amount that produces `targetPayment` at the given rate and term. */
export function principalFromPayment(
  targetPayment: number,
  annualRatePercent: number,
  numberOfMonths: number,
): number {
  if (numberOfMonths <= 0 || targetPayment <= 0) {
    return 0;
  }

  const monthlyRate = monthlyRateFromAnnual(annualRatePercent);

  if (monthlyRate === 0) {
    return targetPayment * numberOfMonths;
  }

  const factor = Math.pow(1 + monthlyRate, numberOfMonths);
  return (targetPayment * (factor - 1)) / (monthlyRate * factor);
}

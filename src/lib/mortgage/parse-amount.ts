/** Parse user-entered peso amount (allows commas). */
export function parseAmountInput(raw: string): number {
  const normalized = raw.replace(/,/g, "").trim();
  if (normalized === "") {
    return NaN;
  }
  return Number(normalized);
}

export function validateLumpSumAmount(raw: string): true | string {
  const trimmed = raw.trim();
  if (!trimmed) {
    return "Enter a lump sum amount greater than zero.";
  }
  const amount = parseAmountInput(trimmed);
  if (!Number.isFinite(amount) || amount <= 0) {
    return "Enter a lump sum amount greater than zero.";
  }
  return true;
}

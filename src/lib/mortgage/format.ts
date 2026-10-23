const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 2,
});

const pesoWholeFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

export function formatPeso(amount: number, whole = false): string {
  if (!Number.isFinite(amount)) {
    return "—";
  }
  return whole
    ? pesoWholeFormatter.format(amount)
    : pesoFormatter.format(amount);
}

export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

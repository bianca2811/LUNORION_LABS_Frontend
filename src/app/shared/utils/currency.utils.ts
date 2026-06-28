export function formatCurrency(
  value: number,
  currency = 'PEN',
  locale = 'es-PE',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^0-9.,-]/g, '').replace(',', '.');
  return parseFloat(cleaned);
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getDiscountPercent(price: number, mrp: number): number | null {
  if (mrp <= 0 || price >= mrp) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

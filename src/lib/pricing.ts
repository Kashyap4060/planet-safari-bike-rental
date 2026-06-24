import type { Vehicle } from '@/data/vehicles'

/** Percentage saved on the weekly rate vs paying the daily rate for 7 days. */
export function weeklySavings(v: Vehicle): number {
  return Math.round((1 - v.priceWeek / (v.priceDay * 7)) * 100)
}

/** Percentage saved on the monthly rate vs paying the daily rate for 30 days. */
export function monthlySavings(v: Vehicle): number {
  return Math.round((1 - v.priceMonth / (v.priceDay * 30)) * 100)
}

/** Format a number as Indian Rupees, e.g. 5499 -> "₹5,499". */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

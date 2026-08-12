import { CURRENCY_CODE, CURRENCY_LOCALE } from "./constants";

/**
 * Formats a numeric price into a luxury currency string.
 * High-end brands often exclude decimal places for whole numbers (e.g., $12,500 instead of $12,500.00).
 * @param amount - The numeric value of the amount.
 * @param showDecimals - Whether to force display of decimals. Defaults to false if whole.
 * @returns A formatted currency string.
 */
export function formatCurrency(amount: number, showDecimals: boolean = false): string {
  const hasDecimals = amount % 1 !== 0;
  
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
    minimumFractionDigits: showDecimals || hasDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals || hasDecimals ? 2 : 0,
  }).format(amount);
}
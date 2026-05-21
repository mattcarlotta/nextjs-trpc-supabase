/**
 * Formats a number using US locale number formatting rules.
 *
 * @param n - The number to format
 * @returns The formatted number as a string with US locale formatting (e.g., "1,234" for 1234)
 *
 * @example
 * ```typescript
 * toUSDCurrency(1234.56)
 * // Returns: "1,234.56"
 *
 * toUSDCurrency(1000000)
 * // Returns: "1,000,000"
 *
 * toUSDCurrency(42)
 * // Returns: "42"
 * ```
 */
export function toUSDCurrency(n?: number) {
    return typeof n === "number"
        ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
        : "-";
}

/**
 * Formats a given count into a human-readable format.
 * If the count is greater than or equal to 1,000,000, it formats the count as "X.XM".
 * If the count is greater than or equal to 1,000, it formats the count as "X.XK".
 * Otherwise, it returns the count as a string.
 * @param {number} count The count to format.
 * @returns {string} The formatted count.
 */
export function formatCount(count: number): string {
    if (count >= 1_000_000) {
        return `${(count / 1_000_000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return String(count);
}

/**
 * Clamps a given value between a minimum and maximum value.
 * @param {number} value The value to clamp.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
/**
 * Truncates a given string to a maximum length.
 * If the string is already shorter or equal to the maximum length, it returns the string unchanged.
 * Otherwise, it truncates the string and appends an ellipsis (...) to indicate the string was truncated.
 * @param {string} str The string to truncate.
 * @param {number} maxLength The maximum length of the string.
 * @returns {string} The truncated string.
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) {
        return str;
    }
    return `${str.slice(0, maxLength).trimEnd()}...`;
}

/**
 * Converts a given string into a slug format by replacing all non-alphanumeric
 * characters with dashes and removing any leading or trailing dashes.
 * @example
 * slugify("Hello World!") // "hello-world"
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Capitalizes the first letter of a given string.
 * If the string is empty, it returns the string unchanged.
 * @param {string} str The string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalizeFirst(str: string): string {
    if (!str) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
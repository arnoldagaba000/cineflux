/**
 * Builds a query string from a given object of key-value pairs.
 * Ignores undefined and null values.
 * @example
 * buildQueryString({ foo: "bar", baz: null }) // "?foo=bar"
 * @param {Record<string, string | number | boolean | undefined | null>} params The object of key-value pairs to build the query string from.
 * @returns {string} The built query string, prefixed with a "?" if not empty.
 */
export function buildQueryString(
    params: Record<string, string | number | boolean | undefined | null>
): string {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            searchParams.set(key, String(value));
        }
    }
    const result = searchParams.toString();
    return result ? `?${result}` : "";
}
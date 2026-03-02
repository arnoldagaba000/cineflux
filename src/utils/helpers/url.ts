const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE ?? "en-US";

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

/**
 * Builds a URL for a given TMDB endpoint with optional query parameters.
 * @param {string} endpoint The TMDB endpoint to build the URL for.
 * @param {Record<string, string | number | boolean | undefined> | null} [params] The object of key-value pairs to build the query string from.
 * Ignores undefined and null values.
 * @returns {string} The built URL string.
 */
export function buildTMDBUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
): string {
    if (!TMDB_BASE_URL) {
        throw new Error("Missing TMDB_BASE_URL environment variable");
    }
    
    const normalisedBase = TMDB_BASE_URL.endsWith("/")
        ? TMDB_BASE_URL
        : `${TMDB_BASE_URL}/`;
    const normalisedEndpoint = endpoint.startsWith("/")
        ? endpoint.slice(1)
        : endpoint;
    const url = new URL(normalisedEndpoint, normalisedBase);

    url.searchParams.set("language", DEFAULT_LANGUAGE);

    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null) {
                url.searchParams.set(key, String(value));
            }
        }
    }

    return url.toString();
}

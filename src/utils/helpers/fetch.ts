import axios from "axios";
import { buildTMDBUrl } from "./url";

const TMDB_REQUEST_TIMEOUT_MS = 10_000;

/**
 * Fetches data from the TMDB API.
 *
 * @template T The type of the response data
 * @param {string} endpoint The TMDB API endpoint to fetch data from
 * @param {Record<string, string | number | boolean | undefined>} [params] The object of key-value pairs to build the query string from
 * @returns {Promise<T>} A promise that resolves with the response data
 * @throws {Error} If the TMDB_API_ACCESS_TOKEN environment variable is not set
 * @throws {Error} If the response status is not in the range of 200-299
 */
export async function tmdbFetch<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
    const apiKey = process.env.TMDB_API_ACCESS_TOKEN;

    if (!apiKey) {
        throw new Error(
            "TMDB_API_ACCESS_TOKEN environment variable is not set"
        );
    }

    const url = buildTMDBUrl(endpoint, params);

    const response = await axios.get<T>(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        timeout: TMDB_REQUEST_TIMEOUT_MS,
        validateStatus: () => true,
    });

    if (response.status < 200 || response.status >= 300) {
        const errorBody =
            typeof response.data === "string"
                ? response.data
                : JSON.stringify(response.data);
        throw new Error(
            `TMDB API Error ${response.status}: ${response.statusText} - ${errorBody}`
        );
    }

    return response.data;
}

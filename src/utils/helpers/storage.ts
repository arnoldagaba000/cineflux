/**
 * Safely retrieves a value from localStorage by a given key, falling back to a given default value if:
 * - The key does not exist in localStorage.
 * - The value stored in localStorage is not a valid JSON string.
 * - Any other error occurs while attempting to retrieve the value.
 * @param {string} key The key to retrieve the value by.
 * @param {T} fallback The default value to return if the key does not exist or an error occurs.
 * @returns {T} The retrieved value, or the fallback value if an error occurs.
 */
export function safeLocalStorageGet<T>(key: string, fallback: T): T {
    try {
        const item = localStorage.getItem(key);
        if (!item) {
            return fallback;
        }
        return JSON.parse(item) as T;
    } catch {
        return fallback;
    }
}

/**
 * Safely sets a value in localStorage by a given key, silently failing if localStorage is unavailable.
 * @param {string} key The key to set the value by.
 * @param {unknown} value The value to set.
 */
export function safeLocalStorageSet(key: string, value: unknown): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Silently fail if localStorage is unavailable
    }
}

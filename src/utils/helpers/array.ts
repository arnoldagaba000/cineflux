/**
 * Splits a given array into chunks of a given size.
 * @param {T[]} array The array to split into chunks.
 * @param {number} size The size of each chunk.
 * @returns {T[][]} The array split into chunks of the given size.
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export function chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Returns a new array with all duplicate elements removed based on a given key function.
 * @example
 * uniqueBy([{ id: 1 }, { id: 2 }, { id: 2 }], item => item.id) // [{ id: 1 }, { id: 2 }]
 * @param {T[]} array The array to remove duplicates from.
 * @param {(item: T) => K} keyFn The key function to use for determining uniqueness.
 * @returns {T[]} A new array with all duplicate elements removed.
 */
export function uniqueBy<T, K>(array: T[], keyFn: (item: T) => K): T[] {
    const seen = new Set<K>();
    return array.filter((item) => {
        const key = keyFn(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

/**
 * Returns a new array with the elements of the given array shuffled.
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4]
 * @param {T[]} array The array to shuffle.
 * @returns {T[]} A new array with the elements of the given array shuffled.
 */
export function shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j] as T, copy[i] as T];
    }
    return copy;
}
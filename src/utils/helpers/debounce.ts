/**
 * Returns a debounced version of the given function.
 * The debounced function will not be called until the given delay has passed since the last call.
 * @example
 * const debouncedFunc = debounce(myFunc, 500);
 * debouncedFunc(); // myFunc will not be called until 500ms have passed
 * @param {T} fn The function to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {(...args: Parameters<T>) => void} The debounced function.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
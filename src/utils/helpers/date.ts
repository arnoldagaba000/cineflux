/**
 * Formats a given date string into a human-readable format.
 * If the date string is empty or null, it returns "N/A".
 * Otherwise, it formats the date string into "Month Day, Year" format.
 * If the date string is invalid, it returns the original date string.
 * @param {string | null | undefined} dateString The date string to format.
 * @returns {string} The formatted date string.
 */
export function formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
        return "N/A";
    }
    try {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(dateString));
    } catch {
        return dateString;
    }
}

/**
 * Returns the year from a given date string.
 * If the date string is empty or null, it returns "N/A".
 * Otherwise, it returns the year from the date string in the format "YYYY".
 * If the date string is invalid, it returns "N/A".
 * @param {string | null | undefined} dateString The date string to get the year from.
 * @returns {string} The year from the date string.
 */
export function getYear(dateString: string | null | undefined): string {
    if (!dateString) {
        return "N/A";
    }
    return dateString.split("-")[0] || "N/A";
}

/**
 * Checks if a given date string is recent (i.e., within the last six months).
 * If the date string is empty or null, it returns false.
 * Otherwise, it compares the given date string with the current date minus six months.
 * If the given date string is more recent than the current date minus six months, it returns true.
 * Otherwise, it returns false.
 * @param {string | null | undefined} dateString The date string to check.
 * @returns {boolean} True if the date string is recent, false otherwise.
 */
export function isRecent(dateString: string | null | undefined): boolean {
    if (!dateString) {
        return false;
    }
    const date = new Date(dateString);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return date >= sixMonthsAgo;
}
/**
 * Format a rating to a string with one decimal place.
 * @param rating - the rating to format
 * @returns the formatted rating string
 */
export function formatRating(rating: number): string {
    return rating.toFixed(1);
}

/**
 * Returns a Tailwind CSS color class based on the given rating.
 * Ratings 8 and above will return "text-emerald-400".
 * Ratings 7 and above will return "text-amber-400".
 * Ratings 5 and above will return "text-yellow-500".
 * Ratings below 5 will return "text-red-400".
 * @param {number} rating - the rating to get the color for
 * @returns {string} the color class to use
 */
export function getRatingColor(rating: number): string {
    if (rating >= 8) {
        return "text-emerald-400";
    }
    if (rating >= 7) {
        return "text-amber-400";
    }
    if (rating >= 5) {
        return "text-yellow-500";
    }
    
    return "text-red-400";
}

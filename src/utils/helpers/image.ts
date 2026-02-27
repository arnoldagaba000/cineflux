import type { TMDBImageSize } from "@/types/tmdb";
import { TMDB_IMAGE_BASE_URL } from "../constants/tmdb";

/**
 * Builds a URL for a given image path and size.
 * If the path is not provided, returns null.
 * @param {string | null | undefined} path The image path.
 * @param {TMDBImageSize} [size="w500"] The size of the image.
 * @returns {string | null} The built URL or null if no path was provided.
 */
export function buildImageUrl(
    path: string | null | undefined,
    size: TMDBImageSize = "w500"
): string | null {
    if (!path) {
        return null;
    }

    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Builds a URL for a given poster image path and size.
 * If the path is not provided, returns null.
 * @param {string | null | undefined} path The poster image path.
 * @param {TMDBImageSize} [size="w342"] The size of the poster image.
 * @returns {string | null} The built URL or null if no path was provided.
 */
export function buildPosterUrl(
    path: string | null | undefined,
    size: TMDBImageSize = "w342"
): string | null {
    return buildImageUrl(path, size);
}

/**
 * Builds a URL for a given backdrop image path and size.
 * If the path is not provided, returns null.
 * @param {string | null | undefined} path The backdrop image path.
 * @param {TMDBImageSize} [size="w1280"] The size of the backdrop image.
 * @returns {string | null} The built URL or null if no path was provided.
 */
export function buildBackdropUrl(
    path: string | null | undefined,
    size: TMDBImageSize = "w1280"
): string | null {
    return buildImageUrl(path, size);
}

/**
 * Builds a URL for a given profile image path and size.
 * If the path is not provided, returns null.
 * @param {string | null | undefined} path The profile image path.
 * @param {TMDBImageSize} [size="w185"] The size of the profile image.
 * @returns {string | null} The built URL or null if no path was provided.
 */
export function buildProfileUrl(
    path: string | null | undefined,
    size: TMDBImageSize = "w185"
): string | null {
    return buildImageUrl(path, size);
}

/**
 * Retrieves a required environment variable and throws an error if it is not present.
 * @param {keyof NodeJS.ProcessEnv} key - The key of the environment variable to retrieve.
 * @returns {string} The value of the environment variable.
 * @throws {Error} If the environment variable is not present.
 */
const getRequiredEnv = (key: keyof NodeJS.ProcessEnv): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
};

export const TMDB_BASE_URL = getRequiredEnv("TMDB_BASE_URL");
export const TMDB_IMAGE_BASE_URL = getRequiredEnv("TMDB_IMAGE_BASE_URL");
export const DEFAULT_LANGUAGE = getRequiredEnv("TMDB_LANGUAGE");
export const DEFAULT_REGION = getRequiredEnv("TMDB_REGION");

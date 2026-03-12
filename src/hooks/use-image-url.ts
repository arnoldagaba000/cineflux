import { useSuspenseQuery } from "@tanstack/react-query";
import { configQueryOptions } from "#/features/config/query";

/**
 * Hook that returns an object with functions to build URLs for different image sizes.
 *
 * @returns An object with functions to build URLs for different image sizes.
 *
 * @example
 * const { buildPosterUrl, buildBackdropUrl, buildProfileUrl, buildLogoUrl, buildStillUrl } = useImageUrl();
 * const posterUrl = buildPosterUrl('path/to/image', { width: 500, height: 750 });
 */
export const useImageUrl = () => {
    const { data: config } = useSuspenseQuery(configQueryOptions);

    const posterSizes = config.images.poster_sizes;
    const backdropSizes = config.images.backdrop_sizes;
    const logoSizes = config.images.logo_sizes;
    const profileSizes = config.images.profile_sizes;
    const stillSizes = config.images.still_sizes;

    type PosterSize = Partial<typeof posterSizes>;
    type BackdropSize = Partial<typeof backdropSizes>;
    type LogoSize = Partial<typeof logoSizes>;
    type ProfileSize = Partial<typeof profileSizes>;
    type StillSize = Partial<typeof stillSizes>;

    return {
        /**
         * Returns a URL for the given poster path and size.
         *
         * @param {string | null} path - The path to the poster image.
         * @param {Partial<posterSizes>} size - The size of the poster image.
         * @returns {string | null} - The URL for the poster image, or null if the path is null.
         */
        buildPosterUrl: (path: string | null, size: PosterSize) => {
            if (!path) {
                return null;
            }

            return `${config.images.secure_base_url}${size}${path}`;
        },

        /**
         * Returns a URL for the given backdrop path and size.
         *
         * @param {string | null} path - The path to the backdrop image.
         * @param {Partial<backdropSizes>} size - The size of the backdrop image.
         * @returns {string | null} - The URL for the backdrop image, or null if the path is null.
         */
        buildBackdropUrl: (path: string | null, size: BackdropSize) => {
            if (!path) {
                return null;
            }

            return `${config.images.secure_base_url}${size}${path}`;
        },

        /**
         * Returns a URL for the given profile path and size.
         *
         * @param {string | null} path - The path to the profile image.
         * @param {Partial<ProfileSize>} size - The size of the profile image.
         * @returns {string | null} - The URL for the profile image, or null if the path is null.
         */
        buildProfileUrl: (path: string | null, size: ProfileSize) => {
            if (!path) {
                return null;
            }

            return `${config.images.secure_base_url}${size}${path}`;
        },

        /**
         * Returns a URL for the given logo path and size.
         *
         * @param {string | null} path - The path to the logo image.
         * @param {Partial<LogoSize>} size - The size of the logo image.
         * @returns {string | null} - The URL for the logo image, or null if the path is null.
         */
        buildLogoUrl: (path: string | null, size: LogoSize) => {
            if (!path) {
                return null;
            }

            return `${config.images.secure_base_url}${size}${path}`;
        },

        /**
         * Returns a URL for the given still path and size.
         *
         * @param {string | null} path - The path to the still image.
         * @param {Partial<StillSize>} size - The size of the still image.
         * @returns {string | null} - The URL for the still image, or null if the path is null.
         */
        buildStillUrl: (path: string | null, size: StillSize) => {
            if (!path) {
                return null;
            }

            return `${config.images.secure_base_url}${size}${path}`;
        },
    };
};

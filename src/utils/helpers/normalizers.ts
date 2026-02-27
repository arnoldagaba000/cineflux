import type { TMDBMovieBase, TMDBTrendingItem, TMDBTVBase } from "@/types/tmdb";
import type { NormalizedMedia } from "@/types/ui";

/**
 * Normalize a TMDB movie object to the NormalizedMedia type.
 *
 * @param {TMDBMovieBase} movie - The TMDB movie object to normalize.
 * @returns {NormalizedMedia} - The normalized movie object.
 */
export function normalizeMovie(movie: TMDBMovieBase): NormalizedMedia {
    return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        popularity: movie.popularity,
        genreIds: movie.genre_ids,
        mediaType: "movie",
        originalLanguage: movie.original_language,
    };
}

/**
 * Normalize a TMDB TV object to the NormalizedMedia type.
 *
 * @param {TMDBTVBase} tv - The TMDB TV object to normalize.
 * @returns {NormalizedMedia} - The normalized TV object.
 */
export function normalizeTV(tv: TMDBTVBase): NormalizedMedia {
    return {
        id: tv.id,
        title: tv.name,
        overview: tv.overview,
        posterPath: tv.poster_path,
        backdropPath: tv.backdrop_path,
        releaseDate: tv.first_air_date,
        voteAverage: tv.vote_average,
        voteCount: tv.vote_count,
        popularity: tv.popularity,
        genreIds: tv.genre_ids,
        mediaType: "tv",
        originalLanguage: tv.original_language,
    };
}


/**
 * Normalize a TMDB trending item to the NormalizedMedia type.
 * 
 * @param {TMDBTrendingItem} item - The TMDB trending item to normalize.
 * @returns {NormalizedMedia | null} - The normalized trending item, or null if the item is neither a movie or TV show.
 */
export function normalizeTrendingItem(
    item: TMDBTrendingItem
): NormalizedMedia | null {
    if (item.media_type === "movie") {
        return normalizeMovie(item);
    }
    if (item.media_type === "tv") {
        return normalizeTV(item);
    }
    return null;
}

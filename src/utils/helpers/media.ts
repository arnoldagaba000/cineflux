import type { MovieMedia, TVMedia } from "@/types/media";
import type { TMDBMovieResult, TMDBTVResult } from "@/types/tmdb";

/**
 * Converts a TMDBMovieResult object to a MovieMedia object.
 * @param {TMDBMovieResult} m - The TMDBMovieResult object to convert.
 * @returns {MovieMedia} - The converted MovieMedia object.
 */
export function tmdbMovieToMedia(m: TMDBMovieResult): MovieMedia {
    return {
        id: m.id,
        mediaType: "movie",
        title: m.title ?? m.original_title ?? `movie-${m.id}`,
        originalTitle: m.original_title,
        overview: m.overview ?? null,
        posterPath: m.poster_path ?? null,
        backdropPath: m.backdrop_path ?? null,
        genres:
            m.genres ??
            (m.genre_ids ? m.genre_ids.map((id) => ({ id, name: "" })) : []),
        releaseDate: m.release_date ?? null,
        popularity: m.popularity ?? 0,
        rating: { average: m.vote_average ?? 0, count: m.vote_count ?? 0 },
        runtime: m.runtime ?? null,
        videos: m.videos?.results ?? [],
        credits: m.credits ?? { cast: [], crew: [] },
    };
}

/**
 * Converts a TMDBTVResult object to a TVMedia object.
 * @param {TMDBTVResult} t - The TMDBTVResult object to convert.
 * @returns {TVMedia} - The converted TVMedia object.
 */
export function tmdbTvToMedia(t: TMDBTVResult): TVMedia {
    return {
        id: t.id,
        mediaType: "tv",
        title: t.name ?? t.original_name ?? `tv-${t.id}`,
        originalTitle: t.original_name,
        overview: t.overview ?? null,
        posterPath: t.poster_path ?? null,
        backdropPath: t.backdrop_path ?? null,
        genres:
            t.genres ??
            (t.genre_ids ? t.genre_ids.map((id) => ({ id, name: "" })) : []),
        releaseDate: t.first_air_date ?? null,
        popularity: t.popularity ?? 0,
        rating: { average: t.vote_average ?? 0, count: t.vote_count ?? 0 },
        episodeRunTime: t.episode_run_time ?? null,
        numberOfEpisodes: t.number_of_episodes ?? undefined,
        numberOfSeasons: t.number_of_seasons ?? undefined,
        videos: t.videos?.results ?? [],
        credits: t.credits ?? { cast: [], crew: [] },
    };
}

import type {
    DiscoverMovieParams,
    MovieDetailRequest,
    MovieListParams,
} from "#/features/movies/schemas";

export const TMDB_KEYS = {
    config: ["tmdb", "config"] as const,
    movies: {
        discover: (params: DiscoverMovieParams) =>
            ["movies", "discover", params] as const,
        details: (data: MovieDetailRequest) =>
            ["movies", "details", data] as const,
        nowPlaying: (params: MovieListParams) =>
            ["movies", "nowPlaying", params] as const,
        popular: (params: MovieListParams) =>
            ["movies", "popular", params] as const,
        topRated: (params: MovieListParams) =>
            ["movies", "topRated", params] as const,
        upcoming: (params: MovieListParams) =>
            ["movies", "upcoming", params] as const,
    },
};

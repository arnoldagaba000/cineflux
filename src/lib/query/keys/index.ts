import type {
    DiscoverMovieParams,
    MovieDetailRequest,
    MovieListParams,
} from "#/features/movies/schemas";
import type {
    DiscoverTVShowsParams,
    TVShowDetailsRequest,
    TVShowListParams,
} from "#/features/tv/schema";

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
    tvShows: {
        airingToday: (params: TVShowListParams) =>
            ["tvShows", "airingToday", params] as const,
        onTheAir: (params: TVShowListParams) =>
            ["tvShows", "onTheAir", params] as const,
        discover: (params: DiscoverTVShowsParams) =>
            ["tvShows", "discover", params] as const,
        details: (data: TVShowDetailsRequest) =>
            ["tvShows", "details", data] as const,
        popular: (params: TVShowListParams) =>
            ["tvShows", "popular", params] as const,
        topRated: (params: TVShowListParams) =>
            ["tvShows", "topRated", params] as const,
    },
};

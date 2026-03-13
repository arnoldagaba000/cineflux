import type {
    DiscoverMovieParams,
    MovieDetailRequest,
    MovieListParams,
} from "#/features/movies/schemas";
import type { PersonListParams } from "#/features/person/schema";
import type {
    SearchMovieParams,
    SearchMultiParams,
    SearchPersonParams,
    SearchTVParams,
} from "#/features/search/schema";
import type { TrendingParams } from "#/features/trending/schema";
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
    persons: {
        popular: (params: PersonListParams) =>
            ["persons", "popular", params] as const,
    },
    trending: {
        all: (params: TrendingParams) => ["trending", "all", params] as const,
        movies: (params: TrendingParams) =>
            ["trending", "movies", params] as const,
        tvShows: (params: TrendingParams) =>
            ["trending", "tvShows", params] as const,
        persons: (params: TrendingParams) =>
            ["trending", "persons", params] as const,
    },
    search: {
        multi: (params: SearchMultiParams) =>
            ["search", "multi", params] as const,
        movies: (params: SearchMovieParams) =>
            ["search", "movies", params] as const,
        tvShows: (params: SearchTVParams) =>
            ["search", "tvShows", params] as const,
        persons: (params: SearchPersonParams) =>
            ["search", "persons", params] as const,
    },
};

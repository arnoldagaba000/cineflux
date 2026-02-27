import type {
    TMDBDiscoverMovieParams,
    TMDBDiscoverTVParams,
    TMDBTimeWindow,
} from "./tmdb";
import type { MediaCategory } from "./ui";

// ─── API Response Wrapper ─────────────────────────────────────────────────────

export interface ApiSuccess<T> {
    data: T;
    success: true;
}

export interface ApiError {
    error: string;
    statusCode?: number;
    success: false;
}

export type ApiResult<T> = ApiSuccess<T> | ApiError;

// ─── Server Function Inputs ───────────────────────────────────────────────────

export interface GetMoviesInput extends TMDBDiscoverMovieParams {}

export interface GetTVSeriesInput extends TMDBDiscoverTVParams {}

export interface SearchInput {
    includeAdult?: boolean;
    language?: string;
    page?: number;
    query: string;
}

export interface SearchMoviesInput {
    includeAdult?: boolean;
    page?: number;
    query: string;
    year?: number;
}

export interface SearchTVInput {
    firstAirDateYear?: number;
    includeAdult?: boolean;
    page?: number;
    query: string;
}

export interface GetMediaDetailInput {
    appendToResponse?: string[];
    id: number;
    mediaType: MediaCategory;
}

export interface GetMovieDetailInput {
    appendToResponse?: string[];
    id: number;
}

export interface GetTVDetailInput {
    appendToResponse?: string[];
    id: number;
}

export interface GetTrendingInput {
    mediaType?: "all" | "movie" | "tv";
    page?: number;
    timeWindow?: "day" | "week";
}

export interface GetCreditsInput {
    id: number;
    mediaType: MediaCategory;
}

export interface GetVideosInput {
    id: number;
    mediaType: MediaCategory;
}

export interface GetSimilarInput {
    id: number;
    mediaType: MediaCategory;
    page?: number;
}

export interface GetRecommendationsInput {
    id: number;
    mediaType: MediaCategory;
    page?: number;
}

// ─── TMDB Endpoints ───────────────────────────────────────────────────────────

export type TMDBEndpoint =
    | "/trending/all/day"
    | "/trending/all/week"
    | "/trending/movie/day"
    | "/trending/movie/week"
    | "/trending/tv/day"
    | "/trending/tv/week"
    | "/movie/popular"
    | "/movie/top_rated"
    | "/movie/upcoming"
    | "/movie/now_playing"
    | `/movie/${number}`
    | `/movie/${number}/credits`
    | `/movie/${number}/videos`
    | `/movie/${number}/images`
    | `/movie/${number}/similar`
    | `/movie/${number}/recommendations`
    | "/tv/popular"
    | "/tv/top_rated"
    | "/tv/on_the_air"
    | "/tv/airing_today"
    | `/tv/${number}`
    | `/tv/${number}/credits`
    | `/tv/${number}/videos`
    | `/tv/${number}/images`
    | `/tv/${number}/similar`
    | `/tv/${number}/recommendations`
    | "/search/movie"
    | "/search/tv"
    | "/search/multi"
    | "/genre/movie/list"
    | "/genre/tv/list"
    | "/discover/movie"
    | "/discover/tv"
    | "/configuration";

// ─── Query Key Factory ────────────────────────────────────────────────────────

export const queryKeys = {
    trending: (mediaType: string, timeWindow: string) =>
        ["trending", mediaType, timeWindow] as const,
    movies: {
        list: (params: GetMoviesInput) => ["movies", "list", params] as const,
        trending: (timeWindow: TMDBTimeWindow) =>
            ["movies", "trending", timeWindow] as const,
        popular: () => ["movies", "popular"] as const,
        topRated: () => ["movies", "topRated"] as const,
        upcoming: () => ["movies", "upcoming"] as const,
        nowPlaying: () => ["movies", "nowPlaying"] as const,
        detail: (id: number) => ["movies", "detail", id] as const,
        credits: (id: number) => ["movies", "credits", id] as const,
        images: (id: number) => ["movies", "images", id] as const,
        videos: (id: number) => ["movies", "videos", id] as const,
        similar: (id: number) => ["movies", "similar", id] as const,
        recommendations: (id: number) =>
            ["movies", "recommendations", id] as const,
        genres: () => ["movies", "genres"] as const,
    },
    tv: {
        list: (params: GetTVSeriesInput) => ["tv", "list", params] as const,
        trending: (timeWindow: TMDBTimeWindow) =>
            ["tv", "trending", timeWindow] as const,
        popular: () => ["tv", "popular"] as const,
        topRated: () => ["tv", "topRated"] as const,
        onTheAir: () => ["tv", "onTheAir"] as const,
        airingToday: () => ["tv", "airingToday"] as const,
        detail: (id: number) => ["tv", "detail", id] as const,
        credits: (id: number) => ["tv", "credits", id] as const,
        images: (id: number) => ["tv", "images", id] as const,
        videos: (id: number) => ["tv", "videos", id] as const,
        similar: (id: number) => ["tv", "similar", id] as const,
        recommendations: (id: number) => ["tv", "recommendations", id] as const,
        genres: () => ["tv", "genres"] as const,
    },
    search: {
        multi: (query: string, page: number) =>
            ["search", "multi", query, page] as const,
        movies: (query: string, page: number) =>
            ["search", "movies", query, page] as const,
        tv: (query: string, page: number) =>
            ["search", "tv", query, page] as const,
    },
} as const;

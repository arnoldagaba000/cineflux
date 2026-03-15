import { queryOptions } from "@tanstack/react-query";
import { TMDB_KEYS } from "#/lib/query/keys";
import { queryPolicies } from "#/lib/query/policies";
import {
    getDiscoverMovies,
    getMovieDetails,
    getNowPlayingMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
} from "./functions";
import type {
    DiscoverMovieParams,
    MovieDetailRequest,
    MovieListParams,
} from "./schemas";
import { discoverMovieSchema, MovieListSchema } from "./schemas";

const normalizeDiscoverParams = (params?: DiscoverMovieParams) =>
    discoverMovieSchema.parse(params ?? {});

const normalizeListParams = (params?: MovieListParams) =>
    MovieListSchema.parse(params ?? {});

export const discoverMoviesQueryOptions = (params?: DiscoverMovieParams) => {
    const data = normalizeDiscoverParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.movies.discover(data),
        queryFn: () => getDiscoverMovies({ data }),
        ...queryPolicies.lists,
    });
};

export const nowPlayingMoviesQueryOptions = (params?: MovieListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.movies.nowPlaying(data),
        queryFn: () => getNowPlayingMovies({ data }),
        ...queryPolicies.lists,
    });
};

export const popularMoviesQueryOptions = (params?: MovieListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.movies.popular(data),
        queryFn: () => getPopularMovies({ data }),
        ...queryPolicies.lists,
    });
};

export const topRatedMoviesQueryOptions = (params?: MovieListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.movies.topRated(data),
        queryFn: () => getTopRatedMovies({ data }),
        ...queryPolicies.lists,
    });
};

export const upcomingMoviesQueryOptions = (params?: MovieListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.movies.upcoming(data),
        queryFn: () => getUpcomingMovies({ data }),
        ...queryPolicies.lists,
    });
};

export const movieDetailsQueryOptions = (data: MovieDetailRequest) =>
    queryOptions({
        queryKey: TMDB_KEYS.movies.details(data),
        queryFn: () => getMovieDetails({ data }),
        ...queryPolicies.metadata,
    });

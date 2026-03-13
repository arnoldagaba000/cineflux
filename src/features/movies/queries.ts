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

export const discoverMoviesQueryOptions = (params: DiscoverMovieParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.movies.discover(params),
        queryFn: () => getDiscoverMovies({ data: params }),
        ...queryPolicies.lists,
    });

export const nowPlayingMoviesQueryOptions = (params: MovieListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.movies.nowPlaying(params),
        queryFn: () => getNowPlayingMovies({ data: params }),
        ...queryPolicies.lists,
    });

export const popularMoviesQueryOptions = (params: MovieListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.movies.popular(params),
        queryFn: () => getPopularMovies({ data: params }),
        ...queryPolicies.lists,
    });

export const topRatedMoviesQueryOptions = (params: MovieListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.movies.topRated(params),
        queryFn: () => getTopRatedMovies({ data: params }),
        ...queryPolicies.lists,
    });

export const upcomingMoviesQueryOptions = (params: MovieListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.movies.upcoming(params),
        queryFn: () => getUpcomingMovies({ data: params }),
        ...queryPolicies.lists,
    });

export const movieDetailsQueryOptions = (data: MovieDetailRequest) =>
    queryOptions({
        queryKey: TMDB_KEYS.movies.details(data),
        queryFn: () => getMovieDetails({ data }),
        ...queryPolicies.metadata,
    });

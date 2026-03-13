import { queryOptions } from "@tanstack/react-query";
import { TMDB_KEYS } from "#/lib/query/keys";
import { queryPolicies } from "#/lib/query/policies";
import {
    searchMovies,
    searchMulti,
    searchPersons,
    searchTVShows,
} from "./functions";
import type {
    SearchMovieParams,
    SearchMultiParams,
    SearchPersonParams,
    SearchTVParams,
} from "./schema";

export const searchMultiQueryOptions = (params: SearchMultiParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.search.multi(params),
        queryFn: () => searchMulti({ data: params }),
        ...queryPolicies.search,
    });

export const searchMoviesQueryOptions = (params: SearchMovieParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.search.movies(params),
        queryFn: () => searchMovies({ data: params }),
        ...queryPolicies.search,
    });

export const searchTVShowsQueryOptions = (params: SearchTVParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.search.tvShows(params),
        queryFn: () => searchTVShows({ data: params }),
        ...queryPolicies.search,
    });

export const searchPersonsQueryOptions = (params: SearchPersonParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.search.persons(params),
        queryFn: () => searchPersons({ data: params }),
        ...queryPolicies.search,
    });

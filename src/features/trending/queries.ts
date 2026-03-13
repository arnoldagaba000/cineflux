import { queryOptions } from "@tanstack/react-query";
import { TMDB_KEYS } from "#/lib/query/keys";
import { queryPolicies } from "#/lib/query/policies";
import {
    getTrendingAll,
    getTrendingMovies,
    getTrendingPersons,
    getTrendingTVShows,
} from "./functions";
import type { TrendingParams } from "./schema";

export const trendingAllQueryOptions = (params: TrendingParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.trending.all(params),
        queryFn: () => getTrendingAll({ data: params }),
        ...queryPolicies.lists,
    });

export const trendingMoviesQueryOptions = (params: TrendingParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.trending.movies(params),
        queryFn: () => getTrendingMovies({ data: params }),
        ...queryPolicies.lists,
    });

export const trendingTVShowsQueryOptions = (params: TrendingParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.trending.tvShows(params),
        queryFn: () => getTrendingTVShows({ data: params }),
        ...queryPolicies.lists,
    });

export const trendingPersonsQueryOptions = (params: TrendingParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.trending.persons(params),
        queryFn: () => getTrendingPersons({ data: params }),
        ...queryPolicies.lists,
    });

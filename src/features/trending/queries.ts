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
import { TrendingParamsSchema } from "./schema";

const buildTrendingQueryOptions = <T>(
    keyFn: (params: TrendingParams) => readonly unknown[],
    fetchFn: (args: { data: TrendingParams }) => Promise<T>,
    params?: TrendingParams
) => {
    const data = TrendingParamsSchema.parse(params ?? {});
    return queryOptions({
        queryKey: keyFn(data),
        queryFn: () => fetchFn({ data }),
        ...queryPolicies.lists,
    });
};

export const trendingAllQueryOptions = (params?: TrendingParams) =>
    buildTrendingQueryOptions(TMDB_KEYS.trending.all, getTrendingAll, params);

export const trendingMoviesQueryOptions = (params?: TrendingParams) =>
    buildTrendingQueryOptions(
        TMDB_KEYS.trending.movies,
        getTrendingMovies,
        params
    );

export const trendingTVShowsQueryOptions = (params?: TrendingParams) =>
    buildTrendingQueryOptions(
        TMDB_KEYS.trending.tvShows,
        getTrendingTVShows,
        params
    );

export const trendingPersonsQueryOptions = (params?: TrendingParams) =>
    buildTrendingQueryOptions(
        TMDB_KEYS.trending.persons,
        getTrendingPersons,
        params
    );

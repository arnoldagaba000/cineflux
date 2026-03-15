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

type TrendingParamsWithPage = TrendingParams & { page?: number };

const buildTrendingQueryOptions = <T>(
    keyFn: (params: TrendingParams) => readonly unknown[],
    fetchFn: (args: { data: TrendingParams }) => Promise<T>,
    params?: TrendingParamsWithPage
) => {
    const data = TrendingParamsSchema.parse(params ?? {});
    const merged = params?.page === undefined ? data : { ...data, page: params.page };
    return queryOptions({
        queryKey: keyFn(merged),
        queryFn: () => fetchFn({ data: merged }),
        ...queryPolicies.lists,
    });
};

export const trendingAllQueryOptions = (params?: TrendingParamsWithPage) =>
    buildTrendingQueryOptions(TMDB_KEYS.trending.all, getTrendingAll, params);

export const trendingMoviesQueryOptions = (params?: TrendingParamsWithPage) =>
    buildTrendingQueryOptions(
        TMDB_KEYS.trending.movies,
        getTrendingMovies,
        params
    );

export const trendingTVShowsQueryOptions = (params?: TrendingParamsWithPage) =>
    buildTrendingQueryOptions(
        TMDB_KEYS.trending.tvShows,
        getTrendingTVShows,
        params
    );

export const trendingPersonsQueryOptions = (params?: TrendingParamsWithPage) =>
    buildTrendingQueryOptions(
        TMDB_KEYS.trending.persons,
        getTrendingPersons,
        params
    );

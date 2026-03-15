import { queryOptions } from "@tanstack/react-query";
import { TMDB_KEYS } from "#/lib/query/keys";
import { queryPolicies } from "#/lib/query/policies";
import {
    discoverTVShows,
    getAiringTodayTVShows,
    getOnTheAirTVShows,
    getPopularTVShows,
    getTopRatedTVShows,
    getTVShowDetails,
} from "./functions";
import type {
    DiscoverTVShowsParams,
    TVShowDetailsRequest,
    TVShowListParams,
} from "./schema";
import { discoverTVShowsSchema, TVShowListSchema } from "./schema";

const normalizeDiscoverParams = (params?: DiscoverTVShowsParams) =>
    discoverTVShowsSchema.parse(params ?? {});

const normalizeListParams = (params?: TVShowListParams) =>
    TVShowListSchema.parse(params ?? {});

export const discoverTVShowsQueryOptions = (params?: DiscoverTVShowsParams) => {
    const data = normalizeDiscoverParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.tvShows.discover(data),
        queryFn: () => discoverTVShows({ data }),
        ...queryPolicies.lists,
    });
};

export const airingTodayTVShowsQueryOptions = (params?: TVShowListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.tvShows.airingToday(data),
        queryFn: () => getAiringTodayTVShows({ data }),
        ...queryPolicies.lists,
    });
};

export const onTheAirTVShowsQueryOptions = (params?: TVShowListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.tvShows.onTheAir(data),
        queryFn: () => getOnTheAirTVShows({ data }),
        ...queryPolicies.lists,
    });
};

export const popularTVShowsQueryOptions = (params?: TVShowListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.tvShows.popular(data),
        queryFn: () => getPopularTVShows({ data }),
        ...queryPolicies.lists,
    });
};

export const topRatedTVShowsQueryOptions = (params?: TVShowListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.tvShows.topRated(data),
        queryFn: () => getTopRatedTVShows({ data }),
        ...queryPolicies.lists,
    });
};

export const getTVShowDetailsQueryOptions = (data: TVShowDetailsRequest) =>
    queryOptions({
        queryKey: TMDB_KEYS.tvShows.details(data),
        queryFn: () => getTVShowDetails({ data }),
        ...queryPolicies.metadata,
    });

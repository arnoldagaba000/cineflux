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

export const discoverTVShowsQueryOptions = (params: DiscoverTVShowsParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.tvShows.discover(params),
        queryFn: () => discoverTVShows({ data: params }),
        ...queryPolicies.lists,
    });

export const airingTodayTVShowsQueryOptions = (params: TVShowListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.tvShows.airingToday(params),
        queryFn: () => getAiringTodayTVShows({ data: params }),
        ...queryPolicies.lists,
    });

export const onTheAirTVShowsQueryOptions = (params: TVShowListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.tvShows.onTheAir(params),
        queryFn: () => getOnTheAirTVShows({ data: params }),
        ...queryPolicies.lists,
    });

export const popularTVShowsQueryOptions = (params: TVShowListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.tvShows.popular(params),
        queryFn: () => getPopularTVShows({ data: params }),
        ...queryPolicies.lists,
    });

export const topRatedTVShowsQueryOptions = (params: TVShowListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.tvShows.topRated(params),
        queryFn: () => getTopRatedTVShows({ data: params }),
        ...queryPolicies.lists,
    });

export const getTVShowDetailsQueryOptions = (data: TVShowDetailsRequest) =>
    queryOptions({
        queryKey: TMDB_KEYS.tvShows.details(data),
        queryFn: () => getTVShowDetails({ data }),
        ...queryPolicies.metadata,
    });

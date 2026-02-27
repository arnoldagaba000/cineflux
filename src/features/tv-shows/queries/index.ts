import { queryOptions } from "@tanstack/react-query";
import { type GetTVSeriesInput, queryKeys } from "@/types/api";
import type { TMDBTimeWindow } from "@/types/tmdb";
import { cacheConfig } from "@/utils/constants/cache";
import {
    getAiringTodayTVShows,
    getOnTheAirTVShows,
    getPopularTVShows,
    getRecommendedTVShows,
    getSimilarTVShows,
    getTopRatedTVShows,
    getTrendingTVShows,
    getTVGenres,
    getTVShowCredits,
    getTVShowDetails,
    getTVShowImages,
    getTVShows,
    getTVShowVideos,
} from "../functions";

export const tvShowsQueryOptions = (params: GetTVSeriesInput) =>
    queryOptions({
        queryKey: [...queryKeys.tv.list(params)],
        queryFn: () => getTVShows({ data: params }),
        ...cacheConfig.short,
    });

export const trendingTVShowsQueryOptions = (timeWindow: TMDBTimeWindow) =>
    queryOptions({
        queryKey: [...queryKeys.tv.trending(timeWindow)],
        queryFn: () =>
            getTrendingTVShows({ data: { time_window: timeWindow } }),
        ...cacheConfig.short,
    });

export const popularTVShowsQueryOptions = () =>
    queryOptions({
        queryKey: [...queryKeys.tv.popular()],
        queryFn: () => getPopularTVShows(),
        ...cacheConfig.short,
    });

export const topRatedTVShowsQueryOptions = () =>
    queryOptions({
        queryKey: [...queryKeys.tv.topRated()],
        queryFn: () => getTopRatedTVShows(),
        ...cacheConfig.short,
    });

export const onTheAirTVShowsQueryOptions = () =>
    queryOptions({
        queryKey: [...queryKeys.tv.onTheAir()],
        queryFn: () => getOnTheAirTVShows(),
        ...cacheConfig.short,
    });

export const airingTodayTVShowsQueryOptions = () =>
    queryOptions({
        queryKey: [...queryKeys.tv.airingToday()],
        queryFn: () => getAiringTodayTVShows(),
        ...cacheConfig.short,
    });

export const tvShowDetailQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.tv.detail(id)],
        queryFn: () => getTVShowDetails({ data: { id } }),
        ...cacheConfig.long,
    });

export const tvShowCreditsQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.tv.credits(id)],
        queryFn: () => getTVShowCredits({ data: { id } }),
        ...cacheConfig.medium,
    });

export const similarTVShowsQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.tv.similar(id)],
        queryFn: () => getSimilarTVShows({ data: { id } }),
        ...cacheConfig.medium,
    });

export const recommendedTVShowsQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.tv.recommendations(id)],
        queryFn: () => getRecommendedTVShows({ data: { id } }),
        ...cacheConfig.medium,
    });

export const tvShowImagesQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.tv.images(id)],
        queryFn: () => getTVShowImages({ data: { id } }),
        ...cacheConfig.medium,
    });

export const tvShowVideosQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.tv.videos(id)],
        queryFn: () => getTVShowVideos({ data: { id } }),
        ...cacheConfig.medium,
    });

export const tvShowsGenresQueryOptions = () =>
    queryOptions({
        queryKey: [...queryKeys.tv.genres()],
        queryFn: () => getTVGenres(),
        ...cacheConfig.medium,
    });

import { queryOptions } from "@tanstack/react-query";
import { type GetMoviesInput, queryKeys } from "@/types/api";
import type { TMDBTimeWindow } from "@/types/tmdb";
import { cacheConfig } from "@/utils/constants/cache";
import {
    getMovieCredits,
    getMovieDetail,
    getMovieGenres,
    getMovieImages,
    getMovieRecommendations,
    getMovies,
    getMovieVideos,
    getNowPlayingMovies,
    getPopularMovies,
    getSimilarMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getUpcomingMovies,
} from "../functions";

export const movieQueryOptions = (params: GetMoviesInput) =>
    queryOptions({
        queryKey: [...queryKeys.movies.list(params)],
        queryFn: () => getMovies({ data: params }),
        ...cacheConfig.short,
    });

export const trendingMoviesQueryOptions = (timeWindow: TMDBTimeWindow) =>
    queryOptions({
        queryKey: [...queryKeys.movies.trending(timeWindow)],
        queryFn: () => getTrendingMovies({ data: { time_window: timeWindow } }),
        ...cacheConfig.short,
    });

export const topRatedMoviesQueryOptions = queryOptions({
    queryKey: [...queryKeys.movies.topRated()],
    queryFn: () => getTopRatedMovies(),
    ...cacheConfig.short,
});

export const popularMoviesQueryOptions = queryOptions({
    queryKey: [...queryKeys.movies.popular()],
    queryFn: () => getPopularMovies(),
    ...cacheConfig.short,
});

export const upcomingMoviesQueryOptions = queryOptions({
    queryKey: [...queryKeys.movies.upcoming()],
    queryFn: () => getUpcomingMovies(),
    ...cacheConfig.short,
});

export const nowPlayingMoviesQueryOptions = queryOptions({
    queryKey: [...queryKeys.movies.nowPlaying()],
    queryFn: () => getNowPlayingMovies(),
    ...cacheConfig.short,
});

export const movieDetailQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.movies.detail(id)],
        queryFn: () => getMovieDetail({ data: { id } }),
        ...cacheConfig.long,
    });

export const movieCreditsQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.movies.credits(id)],
        queryFn: () => getMovieCredits({ data: { id } }),
        ...cacheConfig.medium,
    });

export const getMovieImagesQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.movies.images(id)],
        queryFn: () => getMovieImages({ data: { id } }),
        ...cacheConfig.medium,
    });

export const movieVideosQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.movies.videos(id)],
        queryFn: () => getMovieVideos({ data: { id } }),
        ...cacheConfig.medium,
    });

export const movieSimilarQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.movies.similar(id)],
        queryFn: () => getSimilarMovies({ data: { id } }),
        ...cacheConfig.medium,
    });

export const movieRecommendationsQueryOptions = (id: number) =>
    queryOptions({
        queryKey: [...queryKeys.movies.recommendations(id)],
        queryFn: () => getMovieRecommendations({ data: { id } }),
        ...cacheConfig.medium,
    });

export const movieGenresQueryOptions = queryOptions({
    queryKey: [...queryKeys.movies.genres()],
    queryFn: () => getMovieGenres(),
    ...cacheConfig.veryLong,
});

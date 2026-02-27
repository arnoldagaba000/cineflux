import { createServerFn } from "@tanstack/react-start";
import type {
    TMDBCredits,
    TMDBGenreListResponse,
    TMDBImagesResponse,
    TMDBMovieDetail,
    TMDBMovieListResponse,
    TMDBVideosResponse,
} from "@/types/tmdb";
import { tmdbFetch } from "@/utils/helpers/fetch";
import {
    discoverMovieSchema,
    movieIdSchema,
    paginatedMovieIdSchema,
    searchMoviesSchema,
    timeWindow,
} from "../schemas";

export const getMovies = createServerFn()
    .inputValidator(discoverMovieSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBMovieListResponse>("/discover/movie", {
            ...data,
        });
    });

export const getTrendingMovies = createServerFn()
    .inputValidator(timeWindow)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBMovieListResponse>("/trending/movie/", {
            ...data,
        });
    });

export const getTopRatedMovies = createServerFn().handler(async () => {
    return await tmdbFetch<TMDBMovieListResponse>("/movie/top_rated");
});

export const getUpcomingMovies = createServerFn().handler(async () => {
    return await tmdbFetch<TMDBMovieListResponse>("/movie/upcoming");
});

export const getNowPlayingMovies = createServerFn().handler(async () => {
    const response =
        await tmdbFetch<TMDBMovieListResponse>("/movie/now_playing");

    return response;
});

export const getPopularMovies = createServerFn().handler(async () => {
    return await tmdbFetch<TMDBMovieListResponse>("/movie/popular");
});

export const getMovieDetail = createServerFn()
    .inputValidator(movieIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBMovieDetail>(`/movie/${data.id}`);
    });

export const getMovieCredits = createServerFn()
    .inputValidator(movieIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBCredits>(`/movie/${data.id}/credits`);
    });

export const getMovieVideos = createServerFn()
    .inputValidator(movieIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBVideosResponse>(`/movie/${data.id}/videos`);
    });

export const getMovieImages = createServerFn()
    .inputValidator(movieIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBImagesResponse>(`/movie/${data.id}/images`);
    });

export const getSimilarMovies = createServerFn()
    .inputValidator(paginatedMovieIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBMovieListResponse>(
            `/movie/${data.id}/similar`,
            {
                page: data.page,
            }
        );
    });

export const getMovieRecommendations = createServerFn()
    .inputValidator(paginatedMovieIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBMovieListResponse>(
            `/movie/${data.id}/recommendations`,
            { page: data.page }
        );
    });

export const getMovieGenres = createServerFn().handler(
    async () => {
        return await tmdbFetch<TMDBGenreListResponse>("/genre/movie/list");
    }
);

export const searchMovies = createServerFn()
    .inputValidator(searchMoviesSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBMovieListResponse>("/search/movie", {
            query: data.query,
            page: data.page,
            include_adult: data.include_adult ? "true" : "false",
            year: data.year,
        });
    });

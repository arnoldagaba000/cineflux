import { createServerFn } from "@tanstack/react-start";
import type {
    TMDBCredits,
    TMDBGenreListResponse,
    TMDBImagesResponse,
    TMDBTVDetail,
    TMDBTVListResponse,
    TMDBVideosResponse,
} from "@/types/tmdb";
import { tmdbFetch } from "@/utils/helpers/fetch";
import { discoverTVSchema, searchTVSchema, tvIdSchema } from "../schemas";

export const getTVShows = createServerFn()
    .inputValidator(discoverTVSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBTVListResponse>("/discover/tv", {
            ...data,
        });
    });

export const getTopRatedTVShows = createServerFn().handler(async () => {
    return await tmdbFetch<TMDBTVListResponse>("/tv/top_rated");
});

export const getOnTheAirTVShows = createServerFn().handler(async () => {
    return await tmdbFetch<TMDBTVListResponse>("/tv/on_the_air");
});

export const getAiringTodayTVShows = createServerFn().handler(async () => {
    return await tmdbFetch<TMDBTVListResponse>("/tv/airing_today");
});

export const getPopularTVShows = createServerFn().handler(async () => {
    return await tmdbFetch<TMDBTVListResponse>("/tv/popular");
});

export const getTVShowDetails = createServerFn()
    .inputValidator(tvIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBTVDetail>(`/tv/${data.id}`);
    });

export const getTVShowCredits = createServerFn()
    .inputValidator(tvIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBCredits>(`/tv/${data.id}/credits`);
    });

export const getSimilarTVShows = createServerFn()
    .inputValidator(tvIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBTVListResponse>(`/tv/${data.id}/similar`);
    });

export const getRecommendedTVShows = createServerFn()
    .inputValidator(tvIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBTVListResponse>(
            `/tv/${data.id}/recommendations`
        );
    });

export const getTVShowImages = createServerFn()
    .inputValidator(tvIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBImagesResponse>(`/tv/${data.id}/images`);
    });

export const getTVShowVideos = createServerFn()
    .inputValidator(tvIdSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBVideosResponse>(`/tv/${data.id}/videos`);
    });

export const getTVGenres = createServerFn().handler(async () => {
    return await tmdbFetch<TMDBGenreListResponse>("/genre/tv/list");
});

export const searchTV = createServerFn()
    .inputValidator(searchTVSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBTVListResponse>("/search/tv", {
            query: data.query,
            page: data.page,
            include_adult: data.include_adult ? "true" : "false",
            first_air_date_year: data.first_air_date_year,
        });
    });

import { createServerFn } from "@tanstack/react-start";
import tmdbClient from "#/lib/config/client";
import type { Paginated } from "#/types/pagination-search";
import type { TVShows, TVSummary } from "#/types/tv-shows";
import {
    discoverTVShowsSchema,
    TVShowDetailsRequestSchema,
    TVShowListSchema,
} from "./schema";

export const discoverTVShows = createServerFn()
    .inputValidator(discoverTVShowsSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<TVSummary>>(
            "/discover/tv",
            {
                params: data,
            }
        );
        return result.data;
    });

export const getAiringTodayTVShows = createServerFn()
    .inputValidator(TVShowListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<TVSummary>>(
            "/tv/airing_today",
            {
                params: data,
            }
        );
        return result.data;
    });

export const getOnTheAirTVShows = createServerFn()
    .inputValidator(TVShowListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<TVSummary>>(
            "/tv/on_the_air",
            {
                params: data,
            }
        );
        return result.data;
    });

export const getPopularTVShows = createServerFn()
    .inputValidator(TVShowListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<TVSummary>>(
            "/tv/popular",
            {
                params: data,
            }
        );
        return result.data;
    });

export const getTopRatedTVShows = createServerFn()
    .inputValidator(TVShowListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<TVSummary>>(
            "/tv/top_rated",
            {
                params: data,
            }
        );
        return result.data;
    });

export const getTVShowDetails = createServerFn()
    .inputValidator(TVShowDetailsRequestSchema)
    .handler(async ({ data }) => {
        const append = data.append_to_response?.length
            ? data.append_to_response.join(",")
            : undefined;

        const result = await tmdbClient.get<Paginated<TVShows>>(
            `/tv/${data.tvShowId}`,
            {
                params: append ? { append_to_response: append } : undefined,
            }
        );
        return result.data;
    });

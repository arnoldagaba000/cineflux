import { createServerFn } from "@tanstack/react-start";
import tmdbClient from "#/lib/config/client";
import type { MovieSummary } from "#/types/movies";
import type { Paginated, SearchMultiItem } from "#/types/pagination-search";
import type { PersonSummary } from "#/types/person";
import type { TVSummary } from "#/types/tv-shows";
import { TrendingParamsSchema } from "./schema";

export const getTrendingAll = createServerFn()
    .inputValidator(TrendingParamsSchema)
    .handler(async ({ data }) => {
        const { time_window, ...params } = data;
        const result = await tmdbClient.get<Paginated<SearchMultiItem>>(
            `/trending/all/${time_window}`,
            {
                params,
            }
        );
        return result.data;
    });

export const getTrendingMovies = createServerFn()
    .inputValidator(TrendingParamsSchema)
    .handler(async ({ data }) => {
        const { time_window, ...params } = data;
        const result = await tmdbClient.get<Paginated<MovieSummary>>(
            `/trending/movie/${time_window}`,
            {
                params,
            }
        );
        return result.data;
    });

export const getTrendingTVShows = createServerFn()
    .inputValidator(TrendingParamsSchema)
    .handler(async ({ data }) => {
        const { time_window, ...params } = data;
        const result = await tmdbClient.get<Paginated<TVSummary>>(
            `/trending/tv/${time_window}`,
            {
                params,
            }
        );
        return result.data;
    });

export const getTrendingPersons = createServerFn()
    .inputValidator(TrendingParamsSchema)
    .handler(async ({ data }) => {
        const { time_window, ...params } = data;
        const result = await tmdbClient.get<Paginated<PersonSummary>>(
            `/trending/person/${time_window}`,
            {
                params,
            }
        );
        return result.data;
    });

import { createServerFn } from "@tanstack/react-start";
import tmdbClient from "#/lib/config/client";
import type { MovieSummary } from "#/types/movies";
import type { Paginated, SearchMultiItem } from "#/types/pagination-search";
import type { PersonSummary } from "#/types/person";
import type { TVSummary } from "#/types/tv-shows";
import { TrendingParamsSchema } from "./schema";

const buildTrendingFn = <T>(segment: "all" | "movie" | "tv" | "person") =>
    createServerFn()
        .inputValidator(TrendingParamsSchema)
        .handler(async ({ data }) => {
            const { time_window, ...params } = data;
            const result = await tmdbClient.get<T>(
                `/trending/${segment}/${time_window}`,
                {
                    params,
                }
            );
            return result.data;
        });

export const getTrendingAll = buildTrendingFn<Paginated<SearchMultiItem>>("all");
export const getTrendingMovies =
    buildTrendingFn<Paginated<MovieSummary>>("movie");
export const getTrendingTVShows = buildTrendingFn<Paginated<TVSummary>>("tv");
export const getTrendingPersons =
    buildTrendingFn<Paginated<PersonSummary>>("person");

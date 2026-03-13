import { createServerFn } from "@tanstack/react-start";
import tmdbClient from "#/lib/config/client";
import type { MovieSummary } from "#/types/movies";
import type { Paginated, SearchMulti } from "#/types/pagination-search";
import type { PersonSummary } from "#/types/person";
import type { TVSummary } from "#/types/tv-shows";
import {
    SearchMovieParamsSchema,
    SearchMultiParamsSchema,
    SearchPersonParamsSchema,
    SearchTVParamsSchema,
} from "./schema";

export const searchMulti = createServerFn()
    .inputValidator(SearchMultiParamsSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<SearchMulti>("/search/multi", {
            params: data,
        });
        return result.data;
    });

export const searchMovies = createServerFn()
    .inputValidator(SearchMovieParamsSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<MovieSummary>>(
            "/search/movie",
            {
                params: data,
            }
        );
        return result.data;
    });

export const searchTVShows = createServerFn()
    .inputValidator(SearchTVParamsSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<TVSummary>>(
            "/search/tv",
            {
                params: data,
            }
        );
        return result.data;
    });

export const searchPersons = createServerFn()
    .inputValidator(SearchPersonParamsSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<PersonSummary>>(
            "/search/person",
            {
                params: data,
            }
        );
        return result.data;
    });

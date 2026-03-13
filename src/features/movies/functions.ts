import { createServerFn } from "@tanstack/react-start";
import tmdbClient from "#/lib/config/client";
import type { MovieDetails, Movies } from "#/types/movies";
import type { Paginated } from "#/types/pagination-search";
import {
    dicoverMovieSchema,
    MovieDetailRequestSchema,
    MovieListSchema,
} from "./schemas";

export const getDiscoverMovies = createServerFn()
    .inputValidator(dicoverMovieSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<Movies>>(
            "/discover/movie",
            {
                params: data,
            }
        );
        return result.data;
    });

export const getNowPlayingMovies = createServerFn()
    .inputValidator(MovieListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<Movies>>(
            "/movie/now_playing",
            { params: data }
        );
        return result.data;
    });

export const getPopularMovies = createServerFn()
    .inputValidator(MovieListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<Movies>>(
            "/movie/popular",
            { params: data }
        );
        return result.data;
    });

export const getTopRatedMovies = createServerFn()
    .inputValidator(MovieListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<Movies>>(
            "/movie/top_rated",
            { params: data }
        );
        return result.data;
    });

export const getUpcomingMovies = createServerFn()
    .inputValidator(MovieListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<Movies>>(
            "/movie/upcoming",
            { params: data }
        );
        return result.data;
    });

export const getMovieDetails = createServerFn()
    .inputValidator(MovieDetailRequestSchema)
    .handler(async ({ data }) => {
        const appendParam = data.append_to_response?.length
            ? data.append_to_response.join(",")
            : undefined;

        const result = await tmdbClient.get<MovieDetails>(
            `/movie/${data.movieId}`,
            {
                params: appendParam
                    ? { append_to_response: appendParam }
                    : undefined,
            }
        );
        return result.data;
    });

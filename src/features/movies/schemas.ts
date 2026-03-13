import z from "zod";
import { Id, ISO_3166_1 } from "#/types/helpers";

export const dicoverMovieSchema = z.object({
    include_adult: z.boolean().default(false),
    include_video: z.boolean().default(false),
    language: z.string().default("en-US"),
    page: z.number().default(1),
    primary_release_year: z.string().optional(),
    primary_release_date_gte: z.iso.date().optional(),
    primary_release_date_lte: z.iso.date().optional(),
    region: z.string().optional(),
    sort_by: z
        .enum([
            "original_title.asc",
            "original_title.desc",
            "popularity.asc",
            "popularity.desc",
            "revenue.asc",
            "revenue.desc",
            "title.asc",
            "title.desc",
            "primary_release_date.desc",
            "vote_average.asc",
            "vote_average.desc",
            "vote_count.asc",
            "vote_count.desc",
        ])
        .default("popularity.desc"),
    vote_average_gte: z.number().optional(),
    vote_average_lte: z.number().optional(),
    vote_count_gte: z.number().optional(),
    vote_count_lte: z.number().optional(),
    with_runtime_gte: z.number().optional(),
    with_runtime_lte: z.number().optional(),
    year: z.number().optional(),
});
export type DiscoverMovieParams = z.infer<typeof dicoverMovieSchema>;

export const MovieListSchema = z.object({
    language: z.string().default("en-US"),
    page: z.number().default(1),
    region: ISO_3166_1.optional(),
});
export type MovieListParams = z.infer<typeof MovieListSchema>;

export const MovieIdSchema = Id.nonoptional();
export type MovieId = z.infer<typeof MovieIdSchema>;

export const AppendKeys = [
    "credits",
    "images",
    "videos",
    "recommendations",
    "similar",
    "external_ids",
] as const;
export type AppendKey = (typeof AppendKeys)[number];

export const AppendToResponseSchema = z
    .array(z.enum(AppendKeys))
    .optional();
export type AppendToResponse = z.infer<typeof AppendToResponseSchema>;

export const MovieDetailRequestSchema = z.object({
    movieId: MovieIdSchema,
    append_to_response: AppendToResponseSchema,
});
export type MovieDetailRequest = z.infer<typeof MovieDetailRequestSchema>;

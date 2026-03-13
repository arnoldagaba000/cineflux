import z from "zod";
import { Id, ISO_3166_1 } from "#/types/helpers";
import { AppendToResponseSchema } from "../movies/schemas";

export const discoverTVShowsSchema = z.object({
    "air_date.gte": z.iso.date().optional(),
    "air_date.lte": z.iso.date().optional(),
    first_air_date_year: z.number().nonnegative().optional(),
    "first_air_date.gte": z.iso.date().optional(),
    "first_air_date.lte": z.iso.date().optional(),
    include_adult: z.boolean().default(false),
    include_null_first_air_dates: z.boolean().default(false),
    language: z.string().default("en-US"),
    page: z.number().default(1),
    screened_theatrically: z.boolean().optional(),
    sort_by: z
        .enum([
            "first_air_date.asc",
            "first_air_date.desc",
            "name.asc",
            "name.desc",
            "original_name.asc",
            "original_name.desc",
            "popularity.asc",
            "popularity.desc",
            "vote_average.asc",
            "vote_average.desc",
            "vote_count.asc",
            "vote_count.desc",
        ])
        .default("popularity.desc"),
    timezone: z.string().optional(),
    "vote_average.gte": z.number().optional(),
    "vote_average.lte": z.number().optional(),
    "vote_count.gte": z.number().optional(),
    "vote_count.lte": z.number().optional(),
    with_original_language: z.string().optional(),
    with_origin_country: z.string().optional(),
    "with_runtime.gte": z.number().optional(),
    "with_runtime.lte": z.number().optional(),
});
export type DiscoverTVShowsParams = z.infer<typeof discoverTVShowsSchema>;

export const TVShowListSchema = z.object({
    language: z.string().default("en-US"),
    page: z.number().default(1),
    region: ISO_3166_1.optional(),
});
export type TVShowListParams = z.infer<typeof TVShowListSchema>;

export const TVShowIdSchema = Id.nonoptional();
export type TVShowId = z.infer<typeof TVShowIdSchema>;

export const TVShowDetailsRequestSchema = z.object({
    tvShowId: TVShowIdSchema,
    append_to_response: AppendToResponseSchema,
});
export type TVShowDetailsRequest = z.infer<typeof TVShowDetailsRequestSchema>;

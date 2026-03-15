import z from "zod";
import { ISO_3166_1 } from "#/types/helpers";

const BaseSearchSchema = z.object({
    query: z.string().min(1),
    page: z.number().default(1),
    include_adult: z.boolean().default(false),
    language: z.string().default("en-US"),
});

export const SearchMultiParamsSchema = BaseSearchSchema.extend({});
export type SearchMultiParams = z.infer<typeof SearchMultiParamsSchema>;

export const SearchMovieParamsSchema = BaseSearchSchema.extend({
    primary_release_year: z.number().int().min(0).optional(),
    region: ISO_3166_1.optional(),
    year: z.number().int().min(0).optional(),
});
export type SearchMovieParams = z.infer<typeof SearchMovieParamsSchema>;

export const SearchTVParamsSchema = BaseSearchSchema.extend({
    first_air_date_year: z.number().int().min(0).optional(),
    year: z.number().int().min(0).optional(),
});
export type SearchTVParams = z.infer<typeof SearchTVParamsSchema>;

export const SearchPersonParamsSchema = BaseSearchSchema.extend({});
export type SearchPersonParams = z.infer<typeof SearchPersonParamsSchema>;

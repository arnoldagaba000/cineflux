import z from "zod";
import { ISO_3166_1 } from "#/types/helpers";

const BaseSearchSchema = z.object({
    query: z.string().min(1),
    page: z.number().default(1),
    include_adult: z.boolean().default(false),
    language: z.string().default("en-US"),
    region: ISO_3166_1.optional(),
});

export const SearchMultiParamsSchema = BaseSearchSchema;
export type SearchMultiParams = z.infer<typeof SearchMultiParamsSchema>;

export const SearchMovieParamsSchema = BaseSearchSchema;
export type SearchMovieParams = z.infer<typeof SearchMovieParamsSchema>;

export const SearchTVParamsSchema = BaseSearchSchema;
export type SearchTVParams = z.infer<typeof SearchTVParamsSchema>;

export const SearchPersonParamsSchema = BaseSearchSchema;
export type SearchPersonParams = z.infer<typeof SearchPersonParamsSchema>;

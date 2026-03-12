import z from "zod";
import { MovieSummarySchema } from "./movies";
import { PersonSummarySchema } from "./person";
import { TVSummarySchema } from "./tv-shows";

export const PaginatedSchema = <T extends z.ZodType>(itemSchema: T) =>
    z.object({
        page: z.number(),
        total_pages: z.number().optional(),
        total_results: z.number().optional(),
        results: z.array(itemSchema),
    });

export interface Paginated<T> {
    page: number;
    results: T[];
    total_pages?: number;
    total_results?: number;
}

export const SearchMultiItemSchema = z.union([
    MovieSummarySchema.extend({ media_type: z.literal("movie") }).optional(),
    TVSummarySchema.extend({ media_type: z.literal("tv") }).optional(),
    PersonSummarySchema.extend({ media_type: z.literal("person") }).optional(),
]);
export type SearchMultiItem = z.infer<typeof SearchMultiItemSchema>;

export const SearchMultiSchema = PaginatedSchema(SearchMultiItemSchema);
export type SearchMulti = z.infer<typeof SearchMultiSchema>;

import z from "zod";

export const discoverTVSchema = z.object({
    page: z.number().int().positive().default(1),
    sort_by: z
        .enum([
            "popularity.desc",
            "popularity.asc",
            "first_air_date.desc",
            "first_air_date.asc",
            "vote_average.desc",
            "vote_average.asc",
        ])
        .default("popularity.desc"),
    with_genres: z.string().optional(),
    first_air_date_year: z.number().int().optional(),
    language: z.string().default("en-US"),
});

export const tvIdSchema = z.object({
    id: z.number().int().positive(),
});

export const paginatedTVIdSchema = tvIdSchema.extend({
    page: z.number().int().positive().default(1),
});

export const searchTVSchema = z.object({
    query: z.string().min(1),
    page: z.number().default(1),
    include_adult: z.boolean().default(false),
    first_air_date_year: z.number().optional(),
});

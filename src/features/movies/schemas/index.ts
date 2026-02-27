import z from "zod";

export const movieIdSchema = z.object({
    id: z.number().int().positive(),
});

export const discoverMovieSchema = z.object({
    page: z.number().int().positive().default(1),
    sort_by: z
        .enum([
            "popularity.desc",
            "popularity.asc",
            "release_date.desc",
            "release_date.asc",
            "vote_average.desc",
            "vote_average.asc",
            "vote_count.desc",
        ])
        .default("popularity.desc"),
    with_genres: z.string().optional(),
    year: z.number().int().optional(),
    language: z.string().default("en-US"),
    include_adult: z.boolean().default(false),
});

export const timeWindow = z.object({
    time_window: z.enum(["day", "week"]).default("day"),
});

export const paginatedMovieIdSchema = movieIdSchema.extend({
    page: z.number().int().positive().default(1),
});

export const searchMoviesSchema = z.object({
    query: z.string().min(1),
    page: z.number().default(1),
    include_adult: z.boolean().default(false),
    year: z.number().optional(),
});

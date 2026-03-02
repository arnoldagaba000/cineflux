import z from "zod";

export const trendingSchema = z.object({
    mediaType: z.enum(["all", "movie", "tv"]).default("all"),
    timeWindow: z.enum(["day", "week"]).default("week"),
    page: z.number().int().positive().default(1),
});
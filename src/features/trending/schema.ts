import z from "zod";

export const TrendingTimeWindowSchema = z.enum(["day", "week"]);
export type TrendingTimeWindow = z.infer<typeof TrendingTimeWindowSchema>;

export const TrendingParamsSchema = z.object({
    time_window: TrendingTimeWindowSchema.default("day"),
    language: z.string().default("en-US"),
});
export type TrendingParams = z.infer<typeof TrendingParamsSchema>;

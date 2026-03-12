import z from "zod";
import { Id } from "./helpers";
import { MovieSummarySchema } from "./movies";
import { TVSummarySchema } from "./tv-shows";

export const PersonSummarySchema = z.object({
    profile_path: z.string().nullable(),
    adult: z.boolean().optional(),
    id: Id,
    known_for: z
        .array(z.union([MovieSummarySchema, TVSummarySchema]))
        .optional(),
    known_for_department: z.string().optional(),
    name: z.string(),
    popularity: z.number().optional(),
});
export type PersonSummary = z.infer<typeof PersonSummarySchema>;

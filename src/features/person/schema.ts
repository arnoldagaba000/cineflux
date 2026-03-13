import z from "zod";
import { ISO_3166_1 } from "#/types/helpers";

export const PersonListSchema = z.object({
    language: z.string().default("en-US"),
    page: z.number().default(1),
    region: ISO_3166_1.optional(),
});
export type PersonListParams = z.infer<typeof PersonListSchema>;

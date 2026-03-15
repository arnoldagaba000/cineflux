import z from "zod";
export const PersonListSchema = z.object({
    language: z.string().default("en-US"),
    page: z.number().default(1),
});
export type PersonListParams = z.infer<typeof PersonListSchema>;

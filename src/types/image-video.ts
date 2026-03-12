import z from "zod";
import { DateString, ISO_639_1 } from "./helpers";

export const ImageSchema = z.object({
    file_path: z.string(),
    aspect_ratio: z.number().optional(),
    height: z.number().optional(),
    width: z.number().optional(),
    iso_639_1: ISO_639_1.nullable(),
    vote_average: z.number().optional(),
    vote_count: z.number().optional(),
});
export type Image = z.infer<typeof ImageSchema>;

export const VideoSchema = z.object({
    id: z.string(),
    iso_639_1: ISO_639_1.optional(),
    iso_3166_1: z.string().optional(),
    key: z.string(),
    name: z.string(),
    official: z.boolean().default(true),
    published_at: DateString.optional(),
    site: z.string(),
    size: z.number().optional(),
    type: z.string(),
});
export type Video = z.infer<typeof VideoSchema>;

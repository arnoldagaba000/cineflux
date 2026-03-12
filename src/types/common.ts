import z from "zod";
import { Id, ImagePath, ISO_639_1 } from "./helpers";

export const GenreSchema = z.object({
    id: Id,
    name: z.string(),
});
export type Genre = z.infer<typeof GenreSchema>;

export const ProductionCompanySchema = z.object({
    id: Id.optional(),
    logo_path: ImagePath.optional(),
    name: z.string(),
    origin_country: z.string().optional(),
});
export type ProductionCompany = z.infer<typeof ProductionCompanySchema>;

export const ProductionCountrySchema = z.object({
    iso_3166_1: z.string(),
    name: z.string(),
});
export type ProductionCountry = z.infer<typeof ProductionCountrySchema>;

export const SpokenLAnguagesSchema = z.object({
    english_name: z.string().optional(),
    iso_639_1: ISO_639_1,
    name: z.string(),
});
export type SpokenLAnguages = z.infer<typeof SpokenLAnguagesSchema>;

export const ExternalIDsSchema = z.object({
    id: Id,
    imdb_id: z.string().nullable().optional(),
    freebase_mid: z.string().nullable().optional(),
    freebase_id: z.string().nullable().optional(),
    tvdb_id: z.number().nullable().optional(),
    tvrage_id: z.number().nullable().optional(),
    facebook_id: z.string().nullable().optional(),
    instagram_id: z.string().nullable().optional(),
    twitter_id: z.string().nullable().optional(),
});
export type ExternalIDs = z.infer<typeof ExternalIDsSchema>;

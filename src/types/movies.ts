import z from "zod";
import {
    ExternalIDsSchema,
    GenreSchema,
    ProductionCompanySchema,
    ProductionCountrySchema,
    SpokenLAnguagesSchema,
} from "./common";
import { CreditsSchema } from "./credits";
import { DateString, Id, ImagePath } from "./helpers";
import { ImageSchema, VideoSchema } from "./image-video";

export const MovieSummarySchema = z.object({
    adult: z.boolean().optional(),
    backdrop_path: ImagePath.optional(),
    genre_ids: z.array(z.number()).optional(),
    id: Id,
    original_language: z.string().optional(),
    original_title: z.string().optional(),
    overview: z.string().optional(),
    popularity: z.number().optional(),
    poster_path: ImagePath.optional(),
    release_date: z.string().optional(),
    title: z.string().optional(),
    video: z.boolean().optional(),
    vote_average: z.number().optional(),
    vote_count: z.number().optional(),
});
export type MovieSummary = z.infer<typeof MovieSummarySchema>;

export const MovieDetailsSchema = z.object({
    id: Id,
    adult: z.boolean().optional(),
    backdrop_path: ImagePath.optional(),
    belongs_to_collection: z
        .object({
            id: Id.optional(),
            name: z.string(),
            poster_path: ImagePath.optional(),
            backdrop_path: ImagePath.optional(),
        })
        .nullable()
        .optional(),
    budget: z.number().optional(),
    genres: z.array(GenreSchema).optional(),
    homepage: z.string().nullable().optional(),
    imdb_id: z.string().nullable().optional(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string().nullable().optional(),
    popularity: z.number().optional(),
    poster_path: ImagePath.optional(),
    production_companies: z.array(ProductionCompanySchema).optional(),
    production_countries: z.array(ProductionCountrySchema).optional(),
    release_date: DateString.optional(),
    revenue: z.number().optional(),
    runtime: z.number().optional(),
    spoken_languages: z.array(SpokenLAnguagesSchema).optional(),
    status: z.string().nullable().optional(),
    tagline: z.string().nullable().optional(),
    title: z.string().optional(),
    video: z.boolean().optional(),
    vote_average: z.number().optional(),
    vote_count: z.number().optional(),

    /** Appended resources */
    credits: CreditsSchema.optional(),
    images: z
        .object({
            backdrops: z.array(ImageSchema).optional(),
            posters: z.array(ImageSchema).optional(),
        })
        .optional(),
    videos: z.object({ results: z.array(VideoSchema).optional() }).optional(),
    recommendations: z
        .object({
            page: z.number(),
            results: z.array(MovieSummarySchema).optional(),
            total_pages: z.number().optional(),
            total_results: z.number().optional(),
        })
        .optional(),
    similar: z.object({
        page: z.number(),
        results: z.array(MovieSummarySchema).optional(),
    }),
    external_ids: ExternalIDsSchema.optional(),
});
export type MovieDetails = z.infer<typeof MovieDetailsSchema>;

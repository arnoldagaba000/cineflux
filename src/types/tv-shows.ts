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

export const TVSummarySchema = z.object({
    backdrop_path: ImagePath.optional(),
    first_air_date: z.string().optional(),
    genre_ids: z.array(z.number()).optional(),
    id: Id,
    name: z.string().optional(),
    origin_country: z.array(z.string()).optional(),
    original_language: z.string().optional(),
    original_name: z.string().optional(),
    overview: z.string().optional(),
    popularity: z.number().optional(),
    poster_path: ImagePath.optional(),
    vote_average: z.number().optional(),
    vote_count: z.number().optional(),
});
export type TVSummary = z.infer<typeof TVSummarySchema>;

export const SeasonSchema = z.object({
    air_date: DateString.nullable().optional(),
    episode_count: z.number().optional(),
    id: Id.optional(),
    name: z.string().optional(),
    overview: z.string().optional(),
    poster_path: ImagePath.optional(),
    season_number: z.number().optional(),
});
export type Season = z.infer<typeof SeasonSchema>;

export const TVShowDetailSchema = z.object({
    backdrop_path: ImagePath.optional(),
    created_by: z
        .array(
            z.object({
                id: Id,
                credit_id: z.string(),
                name: z.string(),
                gender: z.number().nullable().optional(),
                profile_path: ImagePath.optional(),
            })
        )
        .optional(),
    episode_run_time: z.array(z.number()).optional(),
    first_air_date: DateString.optional(),
    genres: z.array(GenreSchema).optional(),
    homepage: z.string().optional(),
    id: Id,
    in_production: z.boolean().optional(),
    languages: z.array(z.string()).optional(),
    last_air_date: DateString.optional(),
    last_episode_to_air: z
        .object({
            air_date: DateString.optional(),
            episode_number: z.number().optional(),
            id: Id.optional(),
            name: z.string().optional(),
            overview: z.string().optional(),
            production_code: z.string().optional(),
            season_number: z.number().optional(),
            still_path: ImagePath.optional(),
            vote_average: z.number().optional(),
            vote_count: z.number().optional(),
        })
        .optional(),
    name: z.string().optional(),
    next_episode_to_air: z
        .object({
            air_date: DateString.optional(),
            episode_number: z.number().optional(),
            id: Id.optional(),
            name: z.string().optional(),
            overview: z.string().optional(),
            production_code: z.string().optional(),
            season_number: z.number().optional(),
            still_path: ImagePath.optional(),
            vote_average: z.number().optional(),
            vote_count: z.number().optional(),
        })
        .optional(),
    number_of_episodes: z.number().optional(),
    number_of_seasons: z.number().optional(),
    origin_country: z.array(z.string()).optional(),
    original_language: z.string().optional(),
    original_name: z.string().optional(),
    overview: z.string().optional(),
    popularity: z.number().optional(),
    poster_path: ImagePath.optional(),
    production_companies: z.array(ProductionCompanySchema).optional(),
    production_countries: z.array(ProductionCountrySchema).optional(),
    seasons: z.array(SeasonSchema).optional(),
    spoken_languages: z.array(SpokenLAnguagesSchema).optional(),
    status: z.string().optional(),
    tagline: z.string().optional(),
    type: z.string().optional(),
    vote_average: z.number().optional(),
    vote_count: z.number().optional(),

    /** Appended resources */
    credits: CreditsSchema.optional(),
    images: z
        .object({
            posters: z.array(ImageSchema).optional(),
            stills: z.array(ImageSchema).optional(),
        })
        .optional(),
    videos: z.object({ results: z.array(VideoSchema).optional() }).optional(),
    recommendations: z
        .object({
            page: z.number(),
            results: z.array(TVSummarySchema).optional(),
            total_pages: z.number().optional(),
            total_results: z.number().optional(),
        })
        .optional(),
    similar: z.object({
        page: z.number(),
        results: z.array(TVSummarySchema).optional(),
    }),
    external_ids: ExternalIDsSchema.optional(),
});
export type TVShowDetails = z.infer<typeof TVShowDetailSchema>;

export const TVShowsSchema = z.array(TVSummarySchema);
export type TVShows = z.infer<typeof TVShowsSchema>;
import z from "zod"
import { Id, ImagePath } from "./helpers";
import { MovieSummarySchema } from "./movies";
import { PaginatedSchema, SearchMultiItemSchema } from "./pagination-search";

export const ConfigurationSchema = z.object({
    images: z.object({
        base_url: z.string(),
        secure_base_url: z.string(),
        backdrop_sizes: z.array(z.string()),
        logo_sizes: z.array(z.string()),
        poster_sizes: z.array(z.string()),
        profile_sizes: z.array(z.string()),
        still_sizes: z.array(z.string()),
    }),
    change_keys: z.array(z.string()).optional(),
});
export type Configuration = z.infer<typeof ConfigurationSchema>;

/* --- Watch providers --- */
export const WatchProviderItemSchema = z.object({
    display_priority: z.number().optional(),
    logo_path: ImagePath.optional(),
    provider_id: z.number().optional(),
    provider_name: z.string().optional(),
});
export type WatchProviderItem = z.infer<typeof WatchProviderItemSchema>;

export const WatchProvidersSchema = z.object({
    id: Id,
    results: z.record(
        z.string(),
        z.object({
            link: z.string().optional(),
            flatrate: z.array(WatchProviderItemSchema).optional(),
            buy: z.array(WatchProviderItemSchema).optional(),
            rent: z.array(WatchProviderItemSchema).optional(),
            ads: z.array(WatchProviderItemSchema).optional(),
            free: z.array(WatchProviderItemSchema).optional(),
        })
    ),
});
export type WatchProviders = z.infer<typeof WatchProvidersSchema>;

/* --- Collections, Companies, Lists --- */
export const CollectionSchema = z.object({
    id: Id,
    name: z.string(),
    overview: z.string().nullable().optional(),
    poster_path: ImagePath.optional(),
    backdrop_path: ImagePath.optional(),
    parts: z.array(MovieSummarySchema).optional(),
});
export type Collection = z.infer<typeof CollectionSchema>;

export const CompanySchema = z.object({
    description: z.string().nullable().optional(),
    headquarters: z.string().nullable().optional(),
    homepage: z.string().nullable().optional(),
    id: Id,
    logo_path: ImagePath.optional(),
    name: z.string(),
    origin_country: z.string().optional(),
});
export type Company = z.infer<typeof CompanySchema>;

export const ListSchema = z.object({
    created_by: z.string().optional(),
    description: z.string().nullable().optional(),
    favorite_count: z.number().optional(),
    id: Id,
    items: z.array(MovieSummarySchema).optional(),
    iso_639_1: z.string().optional(),
    name: z.string().optional(),
    poster_path: ImagePath.optional(),
});
export type List = z.infer<typeof ListSchema>;

/* --- Trending wrapper --- */
export const TrendingSchema = PaginatedSchema(SearchMultiItemSchema);
export type Trending = z.infer<typeof TrendingSchema>;
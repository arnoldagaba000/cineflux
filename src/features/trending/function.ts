import { createServerFn } from "@tanstack/react-start";
import type { TMDBTrendingResponse } from "@/types/tmdb";
import { tmdbFetch } from "@/utils/helpers/fetch";
import { trendingSchema } from "./schema";

export const getTrending = createServerFn()
    .inputValidator(trendingSchema)
    .handler(async ({ data }) => {
        return await tmdbFetch<TMDBTrendingResponse>(
            `/trending/${data.mediaType}/${data.timeWindow}`,
            {
                page: data.page,
            }
        );
    });

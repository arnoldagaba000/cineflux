import { queryOptions } from "@tanstack/react-query";
import type { TMDBTimeWindow } from "@/types/tmdb";
import { cacheConfig } from "@/utils/constants/cache";
import { getTrending } from "./function";

export const trendingQueryOptions = (timeWindow: TMDBTimeWindow = "week") =>
    queryOptions({
        queryKey: ["trending"],
        queryFn: () => getTrending({ data: { mediaType: "all", timeWindow } }),
        ...cacheConfig.short,
    });

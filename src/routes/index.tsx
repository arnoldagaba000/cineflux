import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import CarouselSkeleton from "@/components/shared/carousel-skeleton";
import FeaturedHero from "@/components/shared/featured-hero";
import FeaturedHeroFallback from "@/components/shared/featured-hero-fallback";
import TrendingCarousel from "@/components/shared/trending-carousel";
import {
    popularMoviesQueryOptions,
    topRatedMoviesQueryOptions,
} from "@/features/movies/queries";
import { trendingQueryOptions } from "@/features/trending/query";
import {
    popularTVShowsQueryOptions,
    topRatedTVShowsQueryOptions,
} from "@/features/tv-shows/queries";
import type { NormalizedMedia } from "@/types/ui";
import {
    normalizeMovie,
    normalizeTrendingItem,
    normalizeTV,
} from "@/utils/helpers/normalizers";

export const Route = createFileRoute("/")({
    component: HomePage,
    head: () => ({
        meta: [
            { title: "CineFlux — Discover Movies & TV Shows" },
            {
                name: "description",
                content:
                    "Explore trending movies and TV shows. Discover new entertainment and bookmark your favorites.",
            },
        ],
    }),
    loader: async ({ context: { queryClient } }) => {
        await Promise.all([
            queryClient.ensureQueryData(trendingQueryOptions("week")),
            queryClient.ensureQueryData(popularMoviesQueryOptions()),
            queryClient.ensureQueryData(topRatedMoviesQueryOptions()),
            queryClient.ensureQueryData(popularTVShowsQueryOptions()),
            queryClient.ensureQueryData(topRatedTVShowsQueryOptions()),
        ]);
    },
});

function HomePage() {
    const { data: trending } = useSuspenseQuery(trendingQueryOptions("week"));
    const { data: popularMoviesData } = useSuspenseQuery(
        popularMoviesQueryOptions()
    );
    const { data: topRatedMoviesData } = useSuspenseQuery(
        topRatedMoviesQueryOptions()
    );
    const { data: popularTVShowsData } = useSuspenseQuery(
        popularTVShowsQueryOptions()
    );
    const { data: topRatedTVShowsData } = useSuspenseQuery(
        topRatedTVShowsQueryOptions()
    );

    const trendingItems =
        trending.results
            .map(normalizeTrendingItem)
            .filter((item): item is NormalizedMedia => item !== null) ?? [];
    const popularMovies = popularMoviesData.results.map(normalizeMovie) ?? [];
    const topRatedMovies = topRatedMoviesData.results.map(normalizeMovie) ?? [];
    const popularTVShows = popularTVShowsData.results.map(normalizeTV) ?? [];
    const topRatedTVShows = topRatedTVShowsData.results.map(normalizeTV) ?? [];

    const heroItems = trendingItems.slice(0, 5);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <Suspense fallback={<FeaturedHeroFallback />}>
                <FeaturedHero items={heroItems} />
            </Suspense>

            {/* Content sections */}
            <div className="mx-auto max-w-screen-2xl space-y-8 px-4 py-8 sm:space-y-10 sm:py-10 md:space-y-12 md:px-8 md:py-12 lg:space-y-14 lg:px-12">
                <Suspense fallback={<CarouselSkeleton />}>
                    <TrendingCarousel
                        items={trendingItems}
                        title="Trending this week"
                    />
                </Suspense>

                <Suspense fallback={<CarouselSkeleton />}>
                    <TrendingCarousel
                        items={popularMovies}
                        title="Popular Movies"
                    />
                </Suspense>

                <Suspense fallback={<CarouselSkeleton />}>
                    <TrendingCarousel
                        items={topRatedMovies}
                        title="Top Rated Movies"
                    />
                </Suspense>

                <Suspense fallback={<CarouselSkeleton />}>
                    <TrendingCarousel
                        items={popularTVShows}
                        title="Popular TV Shows"
                    />
                </Suspense>

                <Suspense fallback={<CarouselSkeleton />}>
                    <TrendingCarousel
                        items={topRatedTVShows}
                        title="Top Rated TV Shows"
                    />
                </Suspense>
            </div>
        </div>
    );
}

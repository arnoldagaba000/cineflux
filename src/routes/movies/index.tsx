import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ClapperboardIcon, FilmIcon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import BadgeComp from "@/components/shared/badge-comp";
import CarouselSkeleton from "@/components/shared/carousel-skeleton";
import GenreFilter from "@/components/shared/genre-filter";
import MediaGrid from "@/components/shared/media-grid";
import Pagination from "@/components/shared/pagination";
import SortSelect from "@/components/shared/sort-select";
import TrendingCarousel from "@/components/shared/trending-carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    movieGenresQueryOptions,
    movieQueryOptions,
    nowPlayingMoviesQueryOptions,
    topRatedMoviesQueryOptions,
} from "@/features/movies/queries";
import type { MovieSortOption } from "@/types/ui";
import { normalizeMovie } from "@/utils/helpers/normalizers";

const INITIAL_PAGE = 1;
const INITIAL_SORT_BY: MovieSortOption = "popularity.desc";
const CAROUSEL_SKELETON_KEYS = [
    "skeleton-1",
    "skeleton-2",
    "skeleton-3",
    "skeleton-4",
] as const;

const getMovieQueryParams = (
    page: number,
    selectedGenre: number | null,
    sortBy: MovieSortOption
) => ({
    page,
    with_genres: selectedGenre ? String(selectedGenre) : undefined,
    sort_by: sortBy,
});

export const Route = createFileRoute("/movies/")({
    component: MoviePage,
    head: () => ({
        meta: [
            { title: "Movies — CineFlux" },
            {
                name: "description",
                content: "Browse and discover movies from all genres.",
            },
        ],
    }),
    loader: async ({ context: { queryClient } }) => {
        await Promise.all([
            queryClient.ensureQueryData(
                movieQueryOptions(
                    getMovieQueryParams(INITIAL_PAGE, null, INITIAL_SORT_BY)
                )
            ),
            queryClient.ensureQueryData(movieGenresQueryOptions()),
            queryClient.ensureQueryData(nowPlayingMoviesQueryOptions()),
        ]);
    },
});

function MoviePage() {
    const [page, setPage] = useState(INITIAL_PAGE);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<MovieSortOption>(INITIAL_SORT_BY);

    const { data: genresData } = useQuery(movieGenresQueryOptions());
    const { data: nowPlayingData, isPending: isNowPlayingPending } = useQuery(
        nowPlayingMoviesQueryOptions()
    );
    const { data: topRatedData, isPending: isTopRatedPending } = useQuery(
        topRatedMoviesQueryOptions()
    );
    const { data, isFetching, isPending } = useQuery(
        movieQueryOptions(getMovieQueryParams(page, selectedGenre, sortBy))
    );

    const movies = data?.results.map(normalizeMovie) ?? [];
    const genres = genresData?.genres ?? [];
    const nowPlayingMovies = nowPlayingData?.results.map(normalizeMovie) ?? [];
    const topRatedMovies = topRatedData?.results.map(normalizeMovie) ?? [];
    const selectedGenreName =
        genres.find((genre) => genre.id === selectedGenre)?.name ??
        "All Genres";
    const sortLabel =
        {
            "popularity.desc": "Most Popular",
            "popularity.asc": "Least Popular",
            "release_date.desc": "Newest First",
            "release_date.asc": "Oldest First",
            "vote_average.desc": "Highest Rated",
            "vote_average.asc": "Lowest Rated",
            "first_air_date.desc": "Newest Air Date",
            "first_air_date.asc": "Oldest Air Date",
        }[sortBy] ?? "Most Popular";

    const handleGenreChange = (genreId: number | null) => {
        setSelectedGenre(genreId);
        setPage(1);
    };

    const handleSortChange = (sort: MovieSortOption) => {
        setSortBy(sort);
        setPage(1);
    };

    const isGridLoading = isPending || isFetching;

    return (
        <div className="min-h-screen pt-16 sm:pt-20">
            {/* Page Header */}
            <div className="mx-auto w-full max-w-screen-2xl px-4 pb-6 md:px-8 lg:px-12">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10">
                        <FilmIcon className="text-amber-400" size={20} />
                    </div>

                    <div>
                        <h1 className="font-black text-2xl text-white tracking-tight">
                            Movies
                        </h1>
                        {data && (
                            <p className="text-sm text-zinc-500">
                                {data.total_results.toLocaleString()} movies
                                found
                            </p>
                        )}
                    </div>
                </div>

                <Card className="mb-6 border border-zinc-800 bg-zinc-900/70 py-0">
                    <CardHeader className="pt-2">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="space-y-1">
                                <BadgeComp
                                    className="w-fit"
                                    label="Now Playing"
                                    variant="status"
                                />
                                <CardTitle className="font-black text-white text-xl tracking-tight sm:text-2xl">
                                    In theaters and fresh on the radar
                                </CardTitle>
                                <p className="max-w-2xl text-sm text-zinc-500">
                                    A quick pulse on what is landing right now
                                    before you dive into the full catalog.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                                <ClapperboardIcon size={14} />
                                Curated from TMDB now playing
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        {isNowPlayingPending &&
                        nowPlayingMovies.length === 0 ? (
                            <div className="flex gap-3 overflow-hidden sm:gap-4">
                                {CAROUSEL_SKELETON_KEYS.map((key) => (
                                    <CarouselSkeleton key={key} />
                                ))}
                            </div>
                        ) : (
                            <TrendingCarousel
                                items={nowPlayingMovies}
                                title="Now Playing"
                            />
                        )}
                    </CardContent>
                </Card>

                {/* Filters */}
                <div className="flex flex-col gap-4">
                    {/* Genre filter */}
                    <GenreFilter
                        genres={genres}
                        onGenreChange={handleGenreChange}
                        selectedGenre={selectedGenre}
                    />

                    {/* Sort */}
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
                        <span className="shrink-0 text-sm text-zinc-500">
                            Sort by:
                        </span>
                        <SortSelect
                            className="w-full sm:w-52"
                            onChange={(value) =>
                                handleSortChange(value as MovieSortOption)
                            }
                            type="movie"
                            value={sortBy}
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="mx-auto w-full max-w-screen-2xl px-4 pb-12 md:px-8 lg:px-12">
                <div className="mb-6 flex flex-wrap items-center gap-2">
                    <BadgeComp label={selectedGenreName} variant="genre" />
                    <BadgeComp label={sortLabel} variant="outline" />
                    {data && (
                        <BadgeComp
                            label={`Page ${page} of ${Math.min(data.total_pages, 500)}`}
                            variant="year"
                        />
                    )}
                    {data && (
                        <span className="text-sm text-zinc-500">
                            {data.total_results.toLocaleString()} results
                        </span>
                    )}
                </div>

                <MediaGrid isLoading={isGridLoading} items={movies} />

                {/* Pagination */}
                {data && data.total_pages > 1 && (
                    <Pagination
                        className="mt-10"
                        currentPage={page}
                        onPageChange={(p) => {
                            setPage(p);
                            if (typeof window !== "undefined") {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        }}
                        totalPages={Math.min(data.total_pages, 500)}
                    />
                )}

                <div className="mt-14">
                    <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                        <CardHeader className="pt-2">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <SparklesIcon size={14} />
                                    <span className="font-semibold text-xs uppercase tracking-[0.18em]">
                                        Editor&apos;s Pick
                                    </span>
                                </div>
                                <CardTitle className="font-black text-white text-xl tracking-tight sm:text-2xl">
                                    Top Rated Worth Your Time
                                </CardTitle>
                                <p className="max-w-2xl text-sm text-zinc-500">
                                    A high-signal rail for nights when you want
                                    something proven instead of scrolling the
                                    full grid.
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {isTopRatedPending &&
                            topRatedMovies.length === 0 ? (
                                <div className="flex gap-3 overflow-hidden sm:gap-4">
                                    {CAROUSEL_SKELETON_KEYS.map((key) => (
                                        <CarouselSkeleton key={key} />
                                    ))}
                                </div>
                            ) : (
                                <TrendingCarousel
                                    items={topRatedMovies}
                                    title="Top Rated Movies"
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

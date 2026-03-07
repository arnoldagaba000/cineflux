import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { FilmIcon } from "lucide-react";
import { useState } from "react";
import GenreFilter from "@/components/shared/genre-filter";
import MediaGrid from "@/components/shared/media-grid";
import Pagination from "@/components/shared/pagination";
import SortSelect from "@/components/shared/sort-select";
import {
    movieGenresQueryOptions,
    movieQueryOptions,
} from "@/features/movies/queries";
import type { SortOption } from "@/types/ui";
import { normalizeMovie } from "@/utils/helpers/normalizers";

const INITIAL_PAGE = 1;
const INITIAL_SORT_BY: SortOption = "popularity.desc";

const getMovieQueryParams = (
    page: number,
    selectedGenre: number | null,
    sortBy: SortOption
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
        ]);
    },
});

function MoviePage() {
    const [page, setPage] = useState(INITIAL_PAGE);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>(INITIAL_SORT_BY);

    const { data: genresData } = useQuery(movieGenresQueryOptions());
    const { data, isFetching, isPending } = useQuery(
        movieQueryOptions(getMovieQueryParams(page, selectedGenre, sortBy))
    );

    const movies = data?.results.map(normalizeMovie) ?? [];
    const genres = genresData?.genres ?? [];

    const handleGenreChange = (genreId: number | null) => {
        setSelectedGenre(genreId);
        setPage(1);
    };

    const handleSortChange = (sort: SortOption) => {
        setSortBy(sort);
        setPage(1);
    };

    const isGridLoading = isPending || isFetching;

    return (
        <div className="min-h-screen pt-16 sm:pt-20">
            {/* Page Header */}
            <div className="mx-auto w-full max-w-screen-2xl px-4 pt-8 pb-6 md:px-8 lg:px-12">
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
                            onChange={handleSortChange}
                            type="movie"
                            value={sortBy}
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="mx-auto w-full max-w-screen-2xl px-4 pb-12 md:px-8 lg:px-12">
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
            </div>
        </div>
    );
}

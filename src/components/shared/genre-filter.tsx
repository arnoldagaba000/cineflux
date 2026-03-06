import { cn } from "@/lib/utils";
import type { TMDBGenre } from "@/types/tmdb";
import { Button } from "../ui/button";

interface GenreFilterProps {
    className?: string;
    genres: TMDBGenre[];
    onGenreChange: (genreId: number | null) => void;
    selectedGenre: number | null;
}

const GenreFilter = ({
    genres,
    selectedGenre,
    onGenreChange,
    className,
}: GenreFilterProps) => {
    return (
        <fieldset
            className={cn(
                "scrollbar-hide flex gap-2 overflow-x-auto pb-1",
                className
            )}
            style={{ scrollbarWidth: "none" }}
        >
            <legend className="sr-only">Filter by genre</legend>
            <Button
                aria-pressed={selectedGenre === null}
                className={
                    selectedGenre === null
                        ? "h-8 shrink-0 rounded-full bg-amber-500 px-3 font-bold text-zinc-900 sm:h-9"
                        : "h-8 shrink-0 rounded-full border border-zinc-700 bg-zinc-800 px-3 text-zinc-400 hover:bg-zinc-700 hover:text-white sm:h-9"
                }
                onClick={() => onGenreChange(null)}
            >
                All
            </Button>

            {genres.map((genre) => (
                <Button
                    aria-pressed={selectedGenre === genre.id}
                    className={
                        selectedGenre === genre.id
                            ? "h-8 shrink-0 rounded-full bg-amber-500 px-3 font-bold text-zinc-900 sm:h-9"
                            : "h-8 shrink-0 rounded-full border border-zinc-700 bg-zinc-800 px-3 text-zinc-400 hover:bg-zinc-700 hover:text-white sm:h-9"
                    }
                    key={genre.id}
                    onClick={() =>
                        onGenreChange(
                            selectedGenre === genre.id ? null : genre.id
                        )
                    }
                >
                    {genre.name}
                </Button>
            ))}
        </fieldset>
    );
};

export default GenreFilter;

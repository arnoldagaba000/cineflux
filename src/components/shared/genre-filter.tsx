import { cn } from "@/lib/utils";
import type { TMDBGenre } from "@/types/tmdb";
import { Button } from "../ui/button";
import { FieldLegend, FieldSet } from "../ui/field";

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
        <FieldSet className={cn("gap-1.5", className)}>
            <FieldLegend className="sr-only">Filter by genre</FieldLegend>
            <div
                className="scrollbar-hide flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
            >
                <Button
                    aria-pressed={selectedGenre === null}
                    className={
                        selectedGenre === null
                            ? "h-8 shrink-0 rounded-full bg-amber-500 px-3 font-bold text-zinc-900 sm:h-9"
                            : "h-8 shrink-0 rounded-full border border-zinc-700 bg-zinc-800 px-3 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    }
                    onClick={() => onGenreChange(null)}
                    variant="secondary"
                >
                    All
                </Button>

                {genres.map((genre) => (
                    <Button
                        aria-pressed={selectedGenre === genre.id}
                        className={
                            selectedGenre === genre.id
                                ? "h-8 shrink-0 rounded-full bg-amber-500 px-3 font-bold text-zinc-900 sm:h-9"
                                : "h-8 shrink-0 rounded-full border border-zinc-700 bg-zinc-800 px-3 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                        }
                        key={genre.id}
                        onClick={() =>
                            onGenreChange(
                                selectedGenre === genre.id ? null : genre.id
                            )
                        }
                        variant="secondary"
                    >
                        {genre.name}
                    </Button>
                ))}
            </div>
        </FieldSet>
    );
};

export default GenreFilter;

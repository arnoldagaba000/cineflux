import { cn } from "@/lib/utils";
import type { SortOption } from "@/types/ui";
import { Field, FieldTitle } from "../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface SortSelectProps {
    className?: string;
    onChange: (value: SortOption) => void;
    type?: "movie" | "tv";
    value: SortOption;
}

const movieSortOptions: { value: SortOption; label: string }[] = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "vote_average.desc", label: "Highest Rated" },
    { value: "release_date.desc", label: "Newest First" },
    { value: "release_date.asc", label: "Oldest First" },
];

const tvSortOptions: { value: SortOption; label: string }[] = [
    { value: "popularity.desc", label: "Most Popular" },
    { value: "vote_average.desc", label: "Highest Rated" },
    { value: "release_date.desc", label: "Newest First" },
    { value: "release_date.asc", label: "Oldest First" },
];

const SortSelect = ({
    value,
    onChange,
    type = "movie",
    className,
}: SortSelectProps) => {
    const options = type === "movie" ? movieSortOptions : tvSortOptions;
    const optionValues = new Set(
        options.map(({ value: optionValue }) => optionValue)
    );
    const selectedLabel =
        options.find((option) => option.value === value)?.label ??
        "Most Popular";

    return (
        <Field className={cn("gap-0", className)} orientation="vertical">
            <FieldTitle className="sr-only">Sort results</FieldTitle>
            <Select
                onValueChange={(nextValue) => {
                    if (optionValues.has(nextValue as SortOption)) {
                        onChange(nextValue as SortOption);
                    }
                }}
                value={value}
            >
                <SelectTrigger
                    aria-label="Sort"
                    className={cn(
                        "h-9 w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 pr-10 text-sm text-white sm:h-10 sm:px-4",
                        "transition-all duration-200 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50",
                        "cursor-pointer hover:border-zinc-600"
                    )}
                >
                    <SelectValue>{selectedLabel}</SelectValue>
                </SelectTrigger>

                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </Field>
    );
};

export default SortSelect;

/** biome-ignore-all lint/correctness/useImageSize: Already set using TailwindCSS */

import { Link } from "@tanstack/react-router";
import {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    FilmIcon,
    InfoIcon,
    PlayIcon,
    StarIcon,
    Tv2Icon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NormalizedMedia } from "@/types/ui";
import { getYear } from "@/utils/helpers/date";
import { buildBackdropUrl } from "@/utils/helpers/image";
import { truncate } from "@/utils/helpers/string";
import { Button, buttonVariants } from "../ui/button";

interface FeaturedHeroProps {
    className?: string;
    items: NormalizedMedia[] | null;
}

const FeaturedHero = ({ items, className }: FeaturedHeroProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!items) {
        return null;
    }
    const featured = items.slice(0, 5);
    const current = featured[activeIndex];

    if (!current) {
        return null;
    }

    const isMovie = current.mediaType === "movie";
    const href = isMovie ? `/movies/${current.id}` : `/tv/${current.id}`;

    return (
        <section
            className={cn(
                "relative h-[62vh] min-h-[28rem] overflow-hidden sm:h-[70vh] sm:min-h-[32rem] lg:h-[75vh] lg:min-h-[38rem]",
                className
            )}
        >
            {/* Backdrop Images */}
            {featured.map((item, index) => (
                <div
                    className={cn(
                        "absolute inset-0 transition-opacity duration-700",
                        index === activeIndex ? "opacity-100" : "opacity-0"
                    )}
                    key={`${item.mediaType}-${item.id}`}
                >
                    <img
                        alt={item.title}
                        className="h-full w-full object-cover"
                        src={
                            buildBackdropUrl(item.backdropPath, "original") ??
                            ""
                        }
                    />

                    {/* Gradients */}
                    <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-b from-zinc-950/40 via-transparent to-transparent" />
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-12 sm:px-6 sm:pb-14 md:px-12 md:pb-16 lg:px-20">
                <div className="max-w-xl sm:max-w-2xl">
                    {/** Meta */}
                    <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mb-4 sm:gap-3">
                        <span className="flex items-center gap-1.5 font-semibold text-amber-400 text-xs uppercase tracking-widest">
                            {isMovie ? (
                                <FilmIcon size={12} />
                            ) : (
                                <Tv2Icon size={12} />
                            )}
                            {isMovie ? "Movie" : "TV Series"}
                        </span>

                        <span className="text-primary/50">·</span>
                        <span className="flex items-center gap-1 text-xs">
                            <CalendarIcon size={11} />
                            {getYear(current.releaseDate)}
                        </span>

                        <span className="text-primary/50">·</span>
                        <span className="flex items-center gap-1 font-semibold text-amber-400 text-xs">
                            <StarIcon className="fill-amber-400" size={11} />
                            {current.voteAverage.toFixed(1)}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="mb-3 font-black text-2xl text-white leading-tight tracking-tight sm:mb-4 sm:text-4xl lg:text-6xl">
                        {current.title}
                    </h1>

                    {/* Overview */}
                    <p className="mb-8 hidden max-w-xl text-muted-foreground text-sm leading-relaxed sm:block sm:text-base">
                        {truncate(current.overview, 180)}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pb-3 md:pb-0">
                        <Link
                            className={buttonVariants({
                                variant: "default",
                                className: "h-10 px-4 sm:p-5",
                            })}
                            to={href}
                        >
                            <PlayIcon className="fill-zinc-900" size={16} />
                            Watch Now
                        </Link>

                        <Link
                            className={buttonVariants({
                                variant: "outline",
                                className: "h-10 px-4 sm:p-5",
                            })}
                            to={href}
                        >
                            <InfoIcon size={16} />
                            More Info
                        </Link>

                        {/* <BookmarkButton media={current} size="lg" variant="icon" /> */}
                    </div>
                </div>

                {/* Slide Indicators & Navigation */}
                <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:bottom-8 sm:justify-start sm:gap-3 sm:px-0 md:right-12 lg:right-20">
                    <Button
                        aria-label="Previous"
                        className="size-8 rounded-full sm:size-9"
                        onClick={() =>
                            setActiveIndex((i) =>
                                i === 0 ? featured.length - 1 : i - 1
                            )
                        }
                        variant="outline"
                    >
                        <ChevronLeftIcon size={16} />
                    </Button>

                    <div className="flex gap-1.5">
                        {featured.map((item, i) => (
                            <button
                                aria-label={`Slide ${i + 1}`}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    i === activeIndex
                                        ? "w-5 bg-amber-500 sm:w-6"
                                        : "w-1.5 bg-white/30 hover:bg-white/50"
                                )}
                                key={`${item.mediaType}-${item.id}`}
                                onClick={() => setActiveIndex(i)}
                                type="button"
                            />
                        ))}
                    </div>

                    <Button
                        aria-label="Next"
                        className="size-8 rounded-full sm:size-9"
                        onClick={() =>
                            setActiveIndex((i) =>
                                i === featured.length - 1 ? 0 : i + 1
                            )
                        }
                        variant="outline"
                    >
                        <ChevronRightIcon size={16} />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedHero;

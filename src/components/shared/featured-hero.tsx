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
        return;
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
                "relative h-[75vh] min-h-125 overflow-hidden",
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
            <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 lg:px-20">
                <div className="max-w-2xl">
                    {/** Meta */}
                    <div className="mb-4 flex items-center gap-3">
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
                    <h1 className="mb-4 font-black text-3xl text-white leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        {current.title}
                    </h1>

                    {/* Overview */}
                    <p className="mb-8 hidden max-w-xl text-muted-foreground text-sm leading-relaxed sm:block sm:text-base">
                        {truncate(current.overview, 180)}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            className={buttonVariants({
                                variant: "default",
                                className: "p-5",
                            })}
                            to={href}
                        >
                            <PlayIcon className="fill-zinc-900" size={16} />
                            Watch Now
                        </Link>

                        <Link
                            className={buttonVariants({
                                variant: "outline",
                                className: "p-5",
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
                <div className="absolute right-6 bottom-8 flex items-center gap-3 md:right-12 lg:right-20">
                    <Button
                        aria-label="Previous"
                        className="rounded-full"
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
                        {featured.map((_, i) => (
                            <button
                                aria-label={`Slide ${i + 1}`}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    i === activeIndex
                                        ? "w-6 bg-amber-500"
                                        : "w-1.5 bg-white/30 hover:bg-white/50"
                                )}
                                // biome-ignore lint/suspicious/noArrayIndexKey: static slide indicators
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                type="button"
                            />
                        ))}
                    </div>

                    <Button
                        aria-label="Previous"
                        className="rounded-full"
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

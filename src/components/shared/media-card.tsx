import { Link } from "@tanstack/react-router";
import { CalendarIcon, FilmIcon, PlayIcon, Tv2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NormalizedMedia } from "@/types/ui";
import { getYear } from "@/utils/helpers/date";
import { buildPosterUrl } from "@/utils/helpers/image";
import { truncate } from "@/utils/helpers/string";
import ImageWithFallback from "./image-with-fallback";
import RatingDisplay from "./rating-display";

interface MediaCardProps {
    className?: string;
    media: NormalizedMedia;
    priority?: boolean;
    variant?: "default" | "compact" | "landscape";
}

const MediaCard = ({
    media,
    variant = "default",
    className,
    priority,
}: MediaCardProps) => {
    const href =
        media.mediaType === "movie" ? `/movies/${media.id}` : `/tv/${media.id}`;

    const year = getYear(media.releaseDate);
    const isMovie = media.mediaType === "movie";

    if (variant === "compact") {
        return (
            <Link
                className={cn(
                    "group relative flex items-center gap-3 rounded-xl p-2.5 transition-all duration-200",
                    "border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/60",
                    className
                )}
                to={href}
            >
                <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded-lg">
                    <ImageWithFallback
                        alt={media.title}
                        className="h-full w-full"
                        src={buildPosterUrl(media.posterPath, "w92")}
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-sm text-white transition-colors group-hover:text-amber-400">
                        {media.title}
                    </h3>

                    <div className="mt-0.5 flex items-center gap-1.5">
                        <span className="text-xs text-zinc-500">{year}</span>
                        <span className="text-zinc-700">·</span>
                        {isMovie ? (
                            <FilmIcon className="text-zinc-500" size={10} />
                        ) : (
                            <Tv2Icon className="text-zinc-500" size={10} />
                        )}
                        <span className="text-xs text-zinc-500">
                            {isMovie ? "Movie" : "TV"}
                        </span>
                    </div>

                    <RatingDisplay
                        className="mt-1"
                        size="sm"
                        value={media.voteAverage}
                    />
                </div>

                {/* <BookmarkButton media={media} size="sm" /> */}
            </Link>
        );
    }

    if (variant === "landscape") {
        return (
            <Link
                className={cn(
                    "group relative flex overflow-hidden rounded-xl transition-all duration-300",
                    "border border-zinc-800 bg-zinc-900 hover:border-amber-500/30",
                    "hover:shadow-amber-500/10 hover:shadow-xl",
                    className
                )}
                to={href}
            >
                <div className="relative h-36 w-24 shrink-0 overflow-hidden">
                    <ImageWithFallback
                        alt={media.title}
                        className="h-full w-full"
                        src={buildPosterUrl(media.posterPath, "w185")}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent to-zinc-900/20" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                    <div>
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 font-bold text-sm text-white leading-tight transition-colors group-hover:text-amber-400">
                                {media.title}
                            </h3>

                            {/* <BookmarkButton
                                className="-mt-0.5 shrink-0"
                                media={media}
                                size="sm"
                            /> */}
                        </div>

                        <div className="mt-1.5 flex items-center gap-2">
                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                <CalendarIcon size={10} />
                                {year}
                            </span>
                            <span className="text-zinc-700">·</span>
                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                {isMovie ? (
                                    <FilmIcon size={10} />
                                ) : (
                                    <Tv2Icon size={10} />
                                )}
                                {isMovie ? "Movie" : "TV Series"}
                            </span>
                        </div>
                    </div>

                    <div className="mt-2">
                        <p className="line-clamp-2 text-xs text-zinc-500 leading-relaxed">
                            {truncate(media.overview, 100)}
                        </p>

                        <RatingDisplay
                            className="mt-2"
                            size="sm"
                            value={media.voteAverage}
                        />
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            className={cn(
                "group relative flex h-87.5 flex-col overflow-hidden rounded-xl transition-all duration-300",
                "border border-zinc-800/80 bg-zinc-900",
                "hover:border-amber-500/30 hover:shadow-amber-500/10 hover:shadow-xl",
                "hover:-translate-y-1",
                className
            )}
            to={href}
        >
            {/* Poster */}
            <div className="relative aspect-2/3 overflow-hidden bg-zinc-950">
                <ImageWithFallback
                    alt={media.title}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    src={buildPosterUrl(media.posterPath, "w342")}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Play button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 shadow-amber-500/50 shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <PlayIcon
                            className="ml-0.5 fill-zinc-900 text-zinc-900"
                            size={20}
                        />
                    </div>
                </div>

                {/* Bookmark button */}
                <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {/* <BookmarkButton media={media} size="sm" /> */}
                </div>

                {/* Media type badge */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-black/60 px-1.5 py-0.5 backdrop-blur-sm">
                    {isMovie ? (
                        <FilmIcon className="text-amber-400" size={10} />
                    ) : (
                        <Tv2Icon className="text-amber-400" size={10} />
                    )}
                    <span className="font-medium text-[10px] text-zinc-300">
                        {isMovie ? "Movie" : "TV"}
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1.5 p-3">
                <h3 className="line-clamp-2 font-bold text-sm text-white leading-tight transition-colors group-hover:text-amber-400">
                    {media.title}
                </h3>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{year}</span>
                    <RatingDisplay size="sm" value={media.voteAverage} />
                </div>
            </div>
        </Link>
    );
};

export default MediaCard;

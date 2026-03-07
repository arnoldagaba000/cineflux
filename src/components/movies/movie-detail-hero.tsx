import {
    CalendarIcon,
    CircleDollarSignIcon,
    ClockIcon,
    ExternalLinkIcon,
    GlobeIcon,
    LanguagesIcon,
    PlayCircleIcon,
    PopcornIcon,
    StarIcon,
} from "lucide-react";
import BadgeComp from "@/components/shared/badge-comp";
import ImageWithFallback from "@/components/shared/image-with-fallback";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TMDBMovieDetail } from "@/types/tmdb";
import { formatDate, formatRuntime, getYear } from "@/utils/helpers/date";
import { buildPosterUrl } from "@/utils/helpers/image";
import { formatRating } from "@/utils/helpers/rating";

const formatCurrency = (value: number) => {
    if (value <= 0) {
        return "Not disclosed";
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(value);
};

const sanitizeHomepageUrl = (homepage: string | null) => {
    if (!homepage) {
        return null;
    }

    try {
        const url = new URL(homepage);

        if (url.protocol === "http:" || url.protocol === "https:") {
            return url.toString();
        }
    } catch {
        return null;
    }

    return null;
};

function MovieDetailActions({
    homepage,
    trailerUrl,
}: {
    homepage: string | null;
    trailerUrl: string | null;
}) {
    const sanitizedHomepage = sanitizeHomepageUrl(homepage);

    return (
        <div className="flex flex-wrap items-center gap-3">
            {trailerUrl && (
                <a
                    className={buttonVariants({
                        size: "lg",
                        className:
                            "rounded-xl bg-amber-500 px-4 text-zinc-950 hover:bg-amber-400",
                    })}
                    href={trailerUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <PlayCircleIcon size={18} />
                    Watch Trailer
                </a>
            )}
            {sanitizedHomepage && (
                <a
                    className={buttonVariants({
                        size: "lg",
                        variant: "outline",
                        className: "rounded-xl",
                    })}
                    href={sanitizedHomepage}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <ExternalLinkIcon size={16} />
                    Official Site
                </a>
            )}
            <a
                className={buttonVariants({
                    size: "lg",
                    variant: "ghost",
                    className:
                        "rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800",
                })}
                href="/movies"
            >
                Back to Movies
            </a>
        </div>
    );
}

interface MovieDetailHeroProps {
    directorName?: string;
    movie: TMDBMovieDetail;
    spokenLanguages: string;
    trailerUrl: string | null;
}

const MovieDetailHero = ({
    directorName,
    movie,
    spokenLanguages,
    trailerUrl,
}: MovieDetailHeroProps) => {
    const productionCountries = movie.production_countries
        .map((country) => country.name)
        .join(", ");
    const hasOverview = movie.overview.trim().length > 0;

    return (
        <section className="grid gap-6 rounded-[2rem] border border-zinc-800/80 bg-zinc-950/92 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8 lg:p-8">
            <div className="mx-auto w-full max-w-[18rem]">
                <div className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-900 shadow-black/40 shadow-xl">
                    <ImageWithFallback
                        alt={movie.title}
                        className="aspect-2/3 w-full"
                        src={buildPosterUrl(movie.poster_path, "w342")}
                    />
                </div>
            </div>

            <div className="min-w-0 space-y-6 lg:pt-4">
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <BadgeComp label={movie.status} variant="status" />
                        <BadgeComp
                            label={getYear(movie.release_date)}
                            variant="year"
                        />
                        <BadgeComp
                            label={movie.original_language.toUpperCase()}
                            variant="outline"
                        />
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-black text-3xl text-white leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            {movie.title}
                        </h1>
                        {movie.original_title !== movie.title && (
                            <p className="text-sm text-zinc-500 sm:text-base">
                                Original title: {movie.original_title}
                            </p>
                        )}
                        {movie.tagline && (
                            <p className="max-w-3xl text-zinc-400 italic">
                                {movie.tagline}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-400">
                        <span className="flex items-center gap-1.5 font-bold text-amber-400">
                            <StarIcon className="fill-amber-400" size={16} />
                            {formatRating(movie.vote_average)}
                            <span className="font-normal text-xs text-zinc-500">
                                ({movie.vote_count.toLocaleString()} votes)
                            </span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CalendarIcon size={14} />
                            {formatDate(movie.release_date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ClockIcon size={14} />
                            {formatRuntime(movie.runtime)}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <GlobeIcon size={14} />
                            {productionCountries || "Country unavailable"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                        <BadgeComp
                            key={genre.id}
                            label={genre.name}
                            variant="genre"
                        />
                    ))}
                </div>

                <p className="max-w-3xl text-sm text-zinc-300 leading-relaxed sm:text-base">
                    {hasOverview
                        ? movie.overview
                        : "Synopsis not available for this title yet."}
                </p>

                <MovieDetailActions
                    homepage={movie.homepage}
                    trailerUrl={trailerUrl}
                />

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                        <CardContent className="space-y-1 py-4">
                            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                                Director
                            </p>
                            <p className="font-semibold text-white">
                                {directorName ?? "Not listed"}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                        <CardContent className="space-y-1 py-4">
                            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                                Budget
                            </p>
                            <p className="flex items-center gap-2 font-semibold text-white">
                                <CircleDollarSignIcon size={16} />
                                {formatCurrency(movie.budget)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                        <CardContent className="space-y-1 py-4">
                            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                                Revenue
                            </p>
                            <p className="flex items-center gap-2 font-semibold text-white">
                                <PopcornIcon size={16} />
                                {formatCurrency(movie.revenue)}
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                        <CardContent className="space-y-1 py-4">
                            <p className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                                Languages
                            </p>
                            <p className="flex items-center gap-2 font-semibold text-white">
                                <LanguagesIcon size={16} />
                                {spokenLanguages || "Not listed"}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default MovieDetailHero;

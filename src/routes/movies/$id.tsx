import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
    ArrowLeftIcon,
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
import MovieCastStrip from "@/components/movies/movie-cast-strip";
import MovieMediaGallery from "@/components/movies/movie-media-gallery";
import BadgeComp from "@/components/shared/badge-comp";
import ImageWithFallback from "@/components/shared/image-with-fallback";
import TrendingCarousel from "@/components/shared/trending-carousel";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    getMovieImagesQueryOptions,
    movieCreditsQueryOptions,
    movieDetailQueryOptions,
    movieRecommendationsQueryOptions,
    movieSimilarQueryOptions,
    movieVideosQueryOptions,
} from "@/features/movies/queries";
import { formatDate, formatRuntime, getYear } from "@/utils/helpers/date";
import { buildBackdropUrl, buildPosterUrl } from "@/utils/helpers/image";
import { normalizeMovie } from "@/utils/helpers/normalizers";
import { formatRating } from "@/utils/helpers/rating";
import {
    getPreferredTrailer,
    getYouTubeEmbedUrl,
    getYouTubeWatchUrl,
} from "@/utils/helpers/video";

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

const getRelatedMovieRows = (
    movieId: number,
    recommendationResults: ReturnType<typeof normalizeMovie>[],
    similarResults: ReturnType<typeof normalizeMovie>[]
) => {
    const recommendationIds = new Set<number>();
    const recommendations = recommendationResults
        .filter((item) => item.id !== movieId)
        .filter((item) => {
            if (recommendationIds.has(item.id)) {
                return false;
            }

            recommendationIds.add(item.id);
            return true;
        })
        .slice(0, 12);
    const similarMovies = similarResults
        .filter((item) => item.id !== movieId)
        .filter((item) => !recommendationIds.has(item.id))
        .slice(0, 12);

    return { recommendations, similarMovies };
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
            <Link
                className={buttonVariants({
                    size: "lg",
                    variant: "ghost",
                    className:
                        "rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800",
                })}
                to="/movies"
            >
                <ArrowLeftIcon size={16} />
                Back to Movies
            </Link>
        </div>
    );
}

export const Route = createFileRoute("/movies/$id")({
    component: MovieDetailPage,
    loader: async ({ context: { queryClient }, params: { id } }) => {
        const movieId = Number(id);

        if (!Number.isInteger(movieId) || movieId <= 0) {
            throw notFound();
        }

        await queryClient.ensureQueryData(movieDetailQueryOptions(movieId));
    },
});

function MovieDetailPage() {
    const { id } = Route.useParams();
    const movieId = Number(id);

    const { data: movie } = useSuspenseQuery(movieDetailQueryOptions(movieId));
    const { data: credits, error: creditsError } = useQuery(
        movieCreditsQueryOptions(movieId)
    );
    const { data: imagesData, error: imagesError } = useQuery(
        getMovieImagesQueryOptions(movieId)
    );
    const { data: videosData, error: videosError } = useQuery(
        movieVideosQueryOptions(movieId)
    );
    const { data: recommendationsData, error: recommendationsError } = useQuery(
        movieRecommendationsQueryOptions(movieId)
    );
    const { data: similarData, error: similarError } = useQuery(
        movieSimilarQueryOptions(movieId)
    );

    const director = credits?.crew.find((c) => c.job === "Director");
    const topCast = credits?.cast.slice(0, 12) ?? [];
    const galleryImages = imagesData?.backdrops.slice(0, 6) ?? [];
    const recommendationCandidates =
        recommendationsData?.results.map(normalizeMovie) ?? [];
    const similarCandidates = similarData?.results.map(normalizeMovie) ?? [];
    const { recommendations, similarMovies } = getRelatedMovieRows(
        movieId,
        recommendationCandidates,
        similarCandidates
    );
    const trailer = getPreferredTrailer(videosData?.results ?? []);
    const trailerUrl = getYouTubeWatchUrl(trailer?.key);
    const trailerEmbedUrl = getYouTubeEmbedUrl(trailer?.key);
    const productionCountries = movie.production_countries
        .map((country) => country.name)
        .join(", ");
    const spokenLanguages = movie.spoken_languages
        .map((language) => language.english_name)
        .join(", ");
    const hasOverview = movie.overview.trim().length > 0;

    return (
        <div className="min-h-screen overflow-x-hidden bg-zinc-950">
            {/* Backdrop */}
            <div className="relative h-120 overflow-hidden sm:h-136">
                <ImageWithFallback
                    alt={movie.title}
                    className="h-full w-full"
                    src={buildBackdropUrl(movie.backdrop_path, "original")}
                />
                <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/40" />

                {/* Back button */}
                <div className="absolute top-20 left-4 md:left-8">
                    <Link
                        className={buttonVariants({
                            variant: "outline",
                        })}
                        to="/movies"
                    >
                        <ArrowLeftIcon size={14} />
                        Movies
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 -mt-74 pb-14 sm:-mt-78 lg:-mt-82">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 md:px-8 lg:px-12">
                    <section className="grid gap-6 rounded-[2rem] border border-zinc-800/80 bg-zinc-950/92 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-8 lg:p-8">
                        <div className="mx-auto w-full max-w-[18rem]">
                            <div className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-900 shadow-black/40 shadow-xl">
                                <ImageWithFallback
                                    alt={movie.title}
                                    className="aspect-2/3 w-full"
                                    src={buildPosterUrl(
                                        movie.poster_path,
                                        "w342"
                                    )}
                                />
                            </div>
                        </div>

                        <div className="min-w-0 space-y-6 lg:pt-4">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <BadgeComp
                                        label={movie.status}
                                        variant="status"
                                    />
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
                                            Original title:{" "}
                                            {movie.original_title}
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
                                        <StarIcon
                                            className="fill-amber-400"
                                            size={16}
                                        />
                                        {formatRating(movie.vote_average)}
                                        <span className="font-normal text-xs text-zinc-500">
                                            ({movie.vote_count.toLocaleString()}{" "}
                                            votes)
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
                                        {productionCountries ||
                                            "Country unavailable"}
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
                                            {director?.name ?? "Not listed"}
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

                    {trailerEmbedUrl && (
                        <section className="space-y-4">
                            <div>
                                <h2 className="font-black text-white text-xl tracking-tight sm:text-2xl">
                                    Trailer
                                </h2>
                                <p className="text-sm text-zinc-500">
                                    A quick preview before you commit.
                                </p>
                            </div>
                            <div className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-zinc-900 shadow-black/30 shadow-xl">
                                <div className="aspect-video">
                                    <iframe
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="h-full w-full"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        src={trailerEmbedUrl}
                                        title={`${movie.title} trailer`}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    {videosError && (
                        <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                            <CardContent className="py-4 text-sm text-zinc-500">
                                Trailer media is unavailable right now.
                            </CardContent>
                        </Card>
                    )}

                    <MovieCastStrip cast={topCast} />
                    {creditsError && topCast.length === 0 && (
                        <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                            <CardContent className="py-4 text-sm text-zinc-500">
                                Cast information could not be loaded.
                            </CardContent>
                        </Card>
                    )}

                    <MovieMediaGallery
                        images={galleryImages}
                        movieTitle={movie.title}
                    />
                    {imagesError && galleryImages.length === 0 && (
                        <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                            <CardContent className="py-4 text-sm text-zinc-500">
                                Gallery images are unavailable right now.
                            </CardContent>
                        </Card>
                    )}

                    {recommendations.length > 0 && (
                        <TrendingCarousel
                            items={recommendations}
                            title="Recommended Next"
                        />
                    )}
                    {recommendationsError && recommendations.length === 0 && (
                        <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                            <CardContent className="py-4 text-sm text-zinc-500">
                                Recommendations are unavailable right now.
                            </CardContent>
                        </Card>
                    )}
                    {similarMovies.length > 0 && (
                        <TrendingCarousel
                            items={similarMovies}
                            title="Similar Movies"
                        />
                    )}
                    {similarError && similarMovies.length === 0 && (
                        <Card className="border border-zinc-800 bg-zinc-900/70 py-0">
                            <CardContent className="py-4 text-sm text-zinc-500">
                                Similar movies are unavailable right now.
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

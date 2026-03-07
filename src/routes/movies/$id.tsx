import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import MovieCastStrip from "@/components/movies/movie-cast-strip";
import MovieDetailBackdrop from "@/components/movies/movie-detail-backdrop";
import MovieDetailHero from "@/components/movies/movie-detail-hero";
import MovieDetailNotice from "@/components/movies/movie-detail-notice";
import MovieDetailRelatedSection from "@/components/movies/movie-detail-related-section";
import MovieDetailTrailer from "@/components/movies/movie-detail-trailer";
import MovieMediaGallery from "@/components/movies/movie-media-gallery";
import {
    getMovieImagesQueryOptions,
    movieCreditsQueryOptions,
    movieDetailQueryOptions,
    movieRecommendationsQueryOptions,
    movieSimilarQueryOptions,
    movieVideosQueryOptions,
} from "@/features/movies/queries";
import { normalizeMovie } from "@/utils/helpers/normalizers";
import {
    getPreferredTrailer,
    getYouTubeEmbedUrl,
    getYouTubeWatchUrl,
} from "@/utils/helpers/video";

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
    const spokenLanguages = movie.spoken_languages
        .map((language) => language.english_name)
        .join(", ");

    return (
        <div className="min-h-screen overflow-x-hidden bg-zinc-950">
            <MovieDetailBackdrop
                backdropPath={movie.backdrop_path}
                title={movie.title}
            />

            <div className="relative z-10 -mt-74 pb-14 sm:-mt-78 lg:-mt-82">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 md:px-8 lg:px-12">
                    <MovieDetailHero
                        directorName={director?.name}
                        movie={movie}
                        spokenLanguages={spokenLanguages}
                        trailerUrl={trailerUrl}
                    />

                    <MovieDetailTrailer
                        movieTitle={movie.title}
                        trailerEmbedUrl={trailerEmbedUrl}
                    />

                    {videosError && (
                        <MovieDetailNotice message="Trailer media is unavailable right now." />
                    )}

                    <MovieCastStrip cast={topCast} />
                    {creditsError && topCast.length === 0 && (
                        <MovieDetailNotice message="Cast information could not be loaded." />
                    )}

                    <MovieMediaGallery
                        images={galleryImages}
                        movieTitle={movie.title}
                    />
                    {imagesError && galleryImages.length === 0 && (
                        <MovieDetailNotice message="Gallery images are unavailable right now." />
                    )}

                    <MovieDetailRelatedSection
                        emptyMessage="No recommendation picks are available for this movie yet."
                        errorMessage="Recommendations are unavailable right now."
                        hasError={Boolean(recommendationsError)}
                        items={recommendations}
                        title="Recommended Next"
                    />
                    <MovieDetailRelatedSection
                        emptyMessage="No similar titles are available for this movie yet."
                        errorMessage="Similar movies are unavailable right now."
                        hasError={Boolean(similarError)}
                        items={similarMovies}
                        title="Similar Movies"
                    />
                </div>
            </div>
        </div>
    );
}

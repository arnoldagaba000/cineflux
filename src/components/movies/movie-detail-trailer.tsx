interface MovieDetailTrailerProps {
    movieTitle: string;
    trailerEmbedUrl: string | null;
}

const MovieDetailTrailer = ({
    movieTitle,
    trailerEmbedUrl,
}: MovieDetailTrailerProps) => {
    if (!trailerEmbedUrl) {
        return null;
    }

    return (
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
                        title={`${movieTitle} trailer`}
                    />
                </div>
            </div>
        </section>
    );
};

export default MovieDetailTrailer;

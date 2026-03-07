import type { TMDBCastMember } from "@/types/tmdb";
import { buildProfileUrl } from "@/utils/helpers/image";
import ImageWithFallback from "../shared/image-with-fallback";
import { ScrollArea } from "../ui/scroll-area";

interface MovieCastStripProps {
    cast: TMDBCastMember[];
}

const MovieCastStrip = ({ cast }: MovieCastStripProps) => {
    if (cast.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="movie-cast-heading" className="space-y-4">
            <div className="flex items-end justify-between gap-3">
                <div>
                    <h2
                        className="font-black text-white text-xl tracking-tight sm:text-2xl"
                        id="movie-cast-heading"
                    >
                        Top Cast
                    </h2>
                    <p className="text-sm text-zinc-500">
                        The main faces behind the story.
                    </p>
                </div>
            </div>

            <ScrollArea className="rounded-2xl">
                <ul className="flex gap-3 pb-4 sm:gap-4">
                    {cast.map((actor) => (
                        <li
                            className="w-32 shrink-0 snap-start rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 sm:w-36"
                            key={actor.id}
                        >
                            <div className="mx-auto mb-3 aspect-square w-full overflow-hidden rounded-2xl bg-zinc-950">
                                <ImageWithFallback
                                    alt={actor.name}
                                    className="h-full w-full"
                                    src={buildProfileUrl(actor.profile_path)}
                                />
                            </div>

                            <p className="line-clamp-2 font-semibold text-sm text-white">
                                {actor.name}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                                {actor.character || "Role unavailable"}
                            </p>
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </section>
    );
};

export default MovieCastStrip;

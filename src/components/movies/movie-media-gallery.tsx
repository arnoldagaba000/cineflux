import type { TMDBImage } from "@/types/tmdb";
import { buildBackdropUrl } from "@/utils/helpers/image";
import ImageWithFallback from "../shared/image-with-fallback";
import { ScrollArea } from "../ui/scroll-area";

interface MovieMediaGalleryProps {
    images: TMDBImage[];
}

const MovieMediaGallery = ({ images }: MovieMediaGalleryProps) => {
    if (images.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="movie-gallery-heading" className="space-y-4">
            <div>
                <h2
                    className="font-black text-white text-xl tracking-tight sm:text-2xl"
                    id="movie-gallery-heading"
                >
                    Gallery
                </h2>
                <p className="text-sm text-zinc-500">
                    Backdrops and stills from the film.
                </p>
            </div>

            <ScrollArea className="rounded-2xl">
                <ul className="flex gap-4 pb-4">
                    {images.map((image) => (
                        <li
                            className="w-[18rem] shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 sm:w-[24rem] lg:w-[28rem]"
                            key={image.file_path}
                        >
                            <ImageWithFallback
                                alt="Movie gallery image"
                                className="aspect-video w-full"
                                src={buildBackdropUrl(image.file_path, "w780")}
                            />
                        </li>
                    ))}
                </ul>
            </ScrollArea>
        </section>
    );
};

export default MovieMediaGallery;

import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import ImageWithFallback from "@/components/shared/image-with-fallback";
import { buttonVariants } from "@/components/ui/button";
import { buildBackdropUrl } from "@/utils/helpers/image";

interface MovieDetailBackdropProps {
    backdropPath: string | null;
    title: string;
}

const MovieDetailBackdrop = ({
    backdropPath,
    title,
}: MovieDetailBackdropProps) => {
    return (
        <div className="relative h-120 overflow-hidden sm:h-136">
            <ImageWithFallback
                alt={title}
                className="h-full w-full"
                src={buildBackdropUrl(backdropPath, "original")}
            />
            <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/40" />

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
    );
};

export default MovieDetailBackdrop;

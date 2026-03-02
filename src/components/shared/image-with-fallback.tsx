import { FilmIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
    alt: string;
    className?: string;
    fallbackIcon?: boolean;
    sizes?: string;
    src: string | null | undefined;
}

const ImageWithFallback = ({
    src,
    alt,
    className,
    sizes,
    fallbackIcon = true,
}: ImageWithFallbackProps) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    if (!src || error) {
        return (
            <div
                aria-label={alt}
                className={cn(
                    "flex items-center justify-center bg-zinc-900 text-zinc-700",
                    className
                )}
            >
                {fallbackIcon && <FilmIcon size={32} />}
            </div>
        );
    }
    return (
        <div className={cn("relative overflow-hidden", className)}>
            {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-zinc-800" />
            )}
            <img
                alt={alt}
                className={cn(
                    "h-full w-full object-cover transition-opacity duration-300",
                    loaded ? "opacity-100" : "opacity-0"
                )}
                onError={() => setError(true)}
                onLoad={() => setLoaded(true)}
                sizes={sizes}
                src={src}
            />
        </div>
    );
};

export default ImageWithFallback;

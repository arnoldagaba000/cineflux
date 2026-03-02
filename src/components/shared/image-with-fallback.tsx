/** biome-ignore-all lint/correctness/useImageSize: Dimensions are defined by fixed card layouts */
import { FilmIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
    alt: string;
    className?: string;
    fallbackIcon?: boolean;
    priority?: boolean;
    sizes?: string;
    src: string | null | undefined;
}

const ImageWithFallback = ({
    src,
    alt,
    className,
    sizes,
    fallbackIcon = true,
    priority = false,
}: ImageWithFallbackProps) => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setError(false);
        setLoaded(false);

        if (!src) {
            return;
        }

        const imageElement = imageRef.current;
        if (!imageElement) {
            return;
        }

        const handleLoad = () => {
            setLoaded(true);
            setError(false);
        };
        const handleError = () => {
            setError(true);
            setLoaded(false);
        };

        // Cached images can be complete before effects attach listeners.
        if (imageElement.complete) {
            if (imageElement.naturalWidth > 0) {
                setLoaded(true);
                return;
            }

            setError(true);
            return;
        }

        imageElement.addEventListener("load", handleLoad);
        imageElement.addEventListener("error", handleError);

        return () => {
            imageElement.removeEventListener("load", handleLoad);
            imageElement.removeEventListener("error", handleError);
        };
    }, [src]);

    if (!src || error) {
        return (
            <div
                aria-label={alt}
                className={cn(
                    "flex items-center justify-center bg-zinc-900 text-zinc-700",
                    className
                )}
                role="img"
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
                decoding="async"
                fetchPriority={priority ? "high" : "auto"}
                loading={priority ? "eager" : "lazy"}
                ref={imageRef}
                sizes={sizes}
                src={src}
            />
        </div>
    );
};

export default ImageWithFallback;

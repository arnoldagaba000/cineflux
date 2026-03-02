/** biome-ignore-all lint/correctness/useImageSize: Dimensions are defined by fixed card layouts */
import { FilmIcon } from "lucide-react";
import { useEffect, useReducer, useRef } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
    alt: string;
    className?: string;
    fallbackIcon?: boolean;
    priority?: boolean;
    sizes?: string;
    src: string | null | undefined;
}

interface ImageLoadState {
    error: boolean;
    loaded: boolean;
}

type ImageLoadAction =
    | { type: "reset" }
    | { type: "loaded" }
    | { type: "errored" };

const initialImageLoadState: ImageLoadState = {
    error: false,
    loaded: false,
};

/**
 * Reducer for image load state.
 *
 * @param {ImageLoadState} state current image load state
 * @param {ImageLoadAction} action action to perform on image load state
 * @returns {ImageLoadState} new image load state
 */
function imageLoadReducer(
    state: ImageLoadState,
    action: ImageLoadAction
): ImageLoadState {
    switch (action.type) {
        case "loaded":
            return { error: false, loaded: true };
        case "errored":
            return { error: true, loaded: false };
        case "reset":
            return initialImageLoadState;
        default:
            return state;
    }
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
    const [{ error, loaded }, dispatch] = useReducer(
        imageLoadReducer,
        initialImageLoadState
    );

    useEffect(() => {
        dispatch({ type: "reset" });

        if (!src) {
            return;
        }

        const imageElement = imageRef.current;
        if (!imageElement) {
            return;
        }

        const handleLoad = () => {
            dispatch({ type: "loaded" });
        };
        const handleError = () => {
            dispatch({ type: "errored" });
        };

        // Cached images can be complete before effects attach listeners.
        if (imageElement.complete) {
            if (imageElement.naturalWidth > 0) {
                dispatch({ type: "loaded" });
                return;
            }

            dispatch({ type: "errored" });
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

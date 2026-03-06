import { ClapperboardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NormalizedMedia } from "@/types/ui";
import MediaCard from "./media-card";
import MediaCardSkeleton from "./media-card-skeleton";

interface MediaGridProps {
    className?: string;
    isLoading?: boolean;
    items: NormalizedMedia[];
    skeletonCount?: number;
    variant?: "default" | "compact" | "landscape";
}

const MediaGrid = ({
    items,
    variant = "default",
    className,
    isLoading = false,
    skeletonCount = 20,
}: MediaGridProps) => {
    const resolvedSkeletonCount =
        variant === "default" ? Math.max(skeletonCount, 15) : skeletonCount;

    const gridClass = cn(
        variant === "default" &&
            "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5",
        variant === "compact" && "grid grid-cols-1 gap-3 sm:grid-cols-2",
        variant === "landscape" &&
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
    );

    if (isLoading) {
        return (
            <div aria-busy className={gridClass}>
                {Array.from({ length: resolvedSkeletonCount }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items don't have unique IDs
                    <MediaCardSkeleton key={i} variant={variant} />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center sm:py-24">
                <div className="mb-4 rounded-full border border-zinc-800 bg-zinc-900 p-3 text-zinc-400">
                    <ClapperboardIcon size={28} />
                </div>
                <h3 className="mb-2 font-semibold text-lg text-zinc-300 sm:text-xl">
                    No results found
                </h3>
                <p className="max-w-md text-sm text-zinc-500">
                    Try adjusting your search or filters to find what you're
                    looking for.
                </p>
            </div>
        );
    }

    return (
        <div className={gridClass}>
            {items.map((media, index) => (
                <MediaCard
                    key={`${media.mediaType}-${media.id}`}
                    media={media}
                    priority={index < 6}
                    variant={variant}
                />
            ))}
        </div>
    );
};

export default MediaGrid;

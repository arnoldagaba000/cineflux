import { Skeleton } from "../ui/skeleton";

const MediaCardSkeleton = ({
    variant,
}: {
    variant: "default" | "compact" | "landscape";
}) => {
    if (variant === "landscape") {
        return (
            <div className="flex overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                <Skeleton className="h-36 w-24 shrink-0 bg-zinc-800" />
                <div className="flex-1 space-y-2 p-4">
                    <Skeleton className="h-4 w-3/4 rounded bg-zinc-800" />
                    <Skeleton className="h-3 w-1/2 rounded bg-zinc-800" />
                    <Skeleton className="h-3 w-full rounded bg-zinc-800" />
                    <Skeleton className="h-3 w-2/3 rounded bg-zinc-800" />
                </div>
            </div>
        );
    }

    if (variant === "compact") {
        return (
            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-2.5">
                <Skeleton className="h-16 w-11 shrink-0 rounded-lg bg-zinc-800" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-3/4 rounded bg-zinc-800" />
                    <Skeleton className="h-3 w-1/2 rounded bg-zinc-800" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <Skeleton className="aspect-2/3 bg-zinc-800" />
            <div className="space-y-2 p-3">
                <Skeleton className="h-4 w-3/4 rounded bg-zinc-800" />
                <Skeleton className="h-3 w-1/2 rounded bg-zinc-800" />
            </div>
        </div>
    );
};

export default MediaCardSkeleton;

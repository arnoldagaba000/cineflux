import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

const CarouselSkeleton = ({ className }: { className?: string }) => {
    return (
        <div className={cn("w-[8.5rem] shrink-0 sm:w-40 md:w-45", className)}>
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                <Skeleton className="block aspect-2/3" />
                <div className="space-y-2 p-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
        </div>
    );
};

export default CarouselSkeleton;

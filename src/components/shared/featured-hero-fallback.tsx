import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FeaturedHeroFallbackProps {
    className?: string;
}

const FeaturedHeroFallback = ({ className }: FeaturedHeroFallbackProps) => {
    return (
        <section
            className={cn(
                "relative h-[75vh] min-h-125 overflow-hidden",
                className
            )}
        >
            <Skeleton className="absolute inset-0 rounded-none" />

            <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-zinc-950/40 via-transparent to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 lg:px-20">
                <div className="max-w-2xl">
                    <div className="mb-4 flex items-center gap-3">
                        <Skeleton className="h-5 w-24 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                    </div>

                    <Skeleton className="mb-4 h-10 w-3/4 md:h-14" />
                    <Skeleton className="mb-2 hidden h-4 w-full sm:block" />
                    <Skeleton className="mb-2 hidden h-4 w-11/12 sm:block" />
                    <Skeleton className="mb-8 hidden h-4 w-2/3 sm:block" />

                    <div className="flex flex-wrap items-center gap-3">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-28" />
                    </div>
                </div>

                <div className="absolute right-6 bottom-8 flex items-center gap-3 md:right-12 lg:right-20">
                    <Skeleton className="size-9 rounded-full" />
                    <div className="flex gap-1.5">
                        <Skeleton className="h-1.5 w-6 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                    </div>
                    <Skeleton className="size-9 rounded-full" />
                </div>
            </div>
        </section>
    );
};

export default FeaturedHeroFallback;

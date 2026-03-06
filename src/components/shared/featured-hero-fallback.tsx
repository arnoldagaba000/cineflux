import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FeaturedHeroFallbackProps {
    className?: string;
}

const FeaturedHeroFallback = ({ className }: FeaturedHeroFallbackProps) => {
    return (
        <section
            className={cn(
                "relative h-[62vh] min-h-[28rem] overflow-hidden sm:h-[70vh] sm:min-h-[32rem] lg:h-[75vh] lg:min-h-[38rem]",
                className
            )}
        >
            <Skeleton className="absolute inset-0 rounded-none" />

            <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-zinc-950/40 via-transparent to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-12 sm:px-6 sm:pb-14 md:px-12 md:pb-16 lg:px-20">
                <div className="max-w-xl sm:max-w-2xl">
                    <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mb-4 sm:gap-3">
                        <Skeleton className="h-5 w-24 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                    </div>

                    <Skeleton className="mb-3 h-8 w-3/4 sm:mb-4 sm:h-10 md:h-14" />
                    <Skeleton className="mb-2 hidden h-4 w-full sm:block" />
                    <Skeleton className="mb-2 hidden h-4 w-11/12 sm:block" />
                    <Skeleton className="mb-8 hidden h-4 w-2/3 sm:block" />

                    <div className="flex flex-wrap items-center gap-3">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-28" />
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 px-4 sm:inset-x-auto sm:right-6 sm:bottom-8 sm:justify-start sm:gap-3 sm:px-0 md:right-12 lg:right-20">
                    <Skeleton className="size-8 rounded-full sm:size-9" />
                    <div className="flex gap-1.5">
                        <Skeleton className="h-1.5 w-5 rounded-full sm:w-6" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                        <Skeleton className="h-1.5 w-1.5 rounded-full" />
                    </div>
                    <Skeleton className="size-8 rounded-full sm:size-9" />
                </div>
            </div>
        </section>
    );
};

export default FeaturedHeroFallback;

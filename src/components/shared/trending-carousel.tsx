import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { NormalizedMedia } from "@/types/ui";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import MediaCard from "./media-card";

interface TrendingCarouselProps {
    className?: string;
    items: NormalizedMedia[] | null;
    title: string;
}

const TrendingCarousel = ({
    title,
    items,
    className,
}: TrendingCarouselProps) => {
    const scrollRef = useRef<HTMLUListElement | null>(null);

    const scroll = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) {
            return;
        }

        const amount = Math.round(el.offsetWidth * 0.9) || 400;
        el.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    if (!items) {
        return null;
    }

    return (
        <section
            aria-labelledby="trending-carousel-title"
            className={cn("relative", className)}
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between sm:mb-5">
                <h2
                    className="font-black text-lg text-white tracking-tight sm:text-2xl"
                    id="trending-carousel-title"
                >
                    {title}
                </h2>

                <div className="flex gap-2">
                    <Button
                        aria-label="Scroll left"
                        className="size-7 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 transition-all duration-150 hover:bg-zinc-700 hover:text-white sm:size-8"
                        onClick={() => scroll("left")}
                        size="icon"
                        variant="ghost"
                    >
                        <ChevronLeftIcon size={16} />
                    </Button>

                    <Button
                        aria-label="Scroll right"
                        className="size-7 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400 transition-all duration-150 hover:bg-zinc-700 hover:text-white sm:size-8"
                        onClick={() => scroll("right")}
                        size="icon"
                        variant="ghost"
                    >
                        <ChevronRightIcon size={16} />
                    </Button>
                </div>
            </div>

            {/* Carousel */}
            <div className="relative">
                <ScrollArea className="rounded-lg">
                    {/* The inner element to be controlled */}
                    <ul
                        aria-label={`${title} items`}
                        className="flex gap-3 overflow-x-auto scroll-smooth px-0 pb-3 sm:gap-4"
                        ref={scrollRef}
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {items.map((media, index) => (
                            <li
                                className="w-[8.5rem] shrink-0 sm:w-40 md:w-45"
                                key={`${media.mediaType}-${media.id}`}
                            >
                                <MediaCard
                                    media={media}
                                    priority={index < 5}
                                    variant="default"
                                />
                            </li>
                        ))}
                    </ul>
                </ScrollArea>

                {/* Fade edges */}
                <div className="pointer-events-none absolute top-0 right-0 bottom-2 w-8 bg-linear-to-l from-zinc-950 to-transparent sm:w-16" />
            </div>
        </section>
    );
};

export default TrendingCarousel;

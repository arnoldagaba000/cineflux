import TrendingCarousel from "@/components/shared/trending-carousel";
import type { NormalizedMedia } from "@/types/ui";
import MovieDetailNotice from "./movie-detail-notice";

interface MovieDetailRelatedSectionProps {
    emptyMessage: string;
    errorMessage: string;
    hasError: boolean;
    items: NormalizedMedia[];
    title: string;
}

const MovieDetailRelatedSection = ({
    emptyMessage,
    errorMessage,
    hasError,
    items,
    title,
}: MovieDetailRelatedSectionProps) => {
    if (items.length > 0) {
        return <TrendingCarousel items={items} title={title} />;
    }

    return (
        <section className="space-y-4">
            <div>
                <h2 className="font-black text-white text-xl tracking-tight sm:text-2xl">
                    {title}
                </h2>
                <p className="text-sm text-zinc-500">
                    {hasError ? errorMessage : emptyMessage}
                </p>
            </div>
            <MovieDetailNotice
                message={
                    hasError
                        ? errorMessage
                        : `${title} are not available for this movie right now.`
                }
            />
        </section>
    );
};

export default MovieDetailRelatedSection;

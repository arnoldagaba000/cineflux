import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    Pagination as UIPagination,
} from "../ui/pagination";

interface PaginationProps {
    className?: string;
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

function getPageRange(current: number, total: number): (number | "...")[] {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
        return [1, 2, 3, "...", total];
    }

    if (current >= total - 2) {
        return [1, "...", total - 2, total - 1, total];
    }

    return [1, "...", current, "...", total];
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: PaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = getPageRange(currentPage, Math.min(totalPages, 500));
    let ellipsisCount = 0;
    const pageItems = pages.map((page) => {
        if (page === "...") {
            ellipsisCount += 1;

            return (
                <PaginationItem key={`ellipsis-${ellipsisCount}`}>
                    <PaginationEllipsis className="text-zinc-600" />
                </PaginationItem>
            );
        }

        return (
            <PaginationItem key={page}>
                <Button
                    aria-current={page === currentPage ? "page" : undefined}
                    aria-label={`Page ${page}`}
                    className={
                        page === currentPage
                            ? "h-8 min-w-8 border-amber-500 bg-amber-500 px-2 font-bold text-zinc-900 sm:h-9 sm:min-w-9"
                            : "h-8 min-w-8 border-zinc-700 px-2 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white sm:h-9 sm:min-w-9"
                    }
                    onClick={() => onPageChange(page)}
                    variant="outline"
                >
                    {page}
                </Button>
            </PaginationItem>
        );
    });

    return (
        <UIPagination
            aria-label="Pagination"
            className={cn(
                "flex flex-wrap items-center justify-center gap-1 sm:gap-1.5",
                className
            )}
        >
            <PaginationContent className="flex-wrap justify-center gap-1 sm:gap-1.5">
                <PaginationItem>
                    <Button
                        aria-label="Previous page"
                        className={
                            currentPage === 1
                                ? "h-8 min-w-8 cursor-not-allowed border-zinc-800 px-2 text-zinc-700 sm:h-9 sm:min-w-9"
                                : "h-8 min-w-8 border-zinc-700 px-2 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white sm:h-9 sm:min-w-9"
                        }
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        variant="outline"
                    >
                        Prev
                    </Button>
                </PaginationItem>

                {pageItems}

                <PaginationItem>
                    <Button
                        aria-label="Next page"
                        className={
                            currentPage === totalPages
                                ? "h-8 min-w-8 cursor-not-allowed border-zinc-800 px-2 text-zinc-700 sm:h-9 sm:min-w-9"
                                : "h-8 min-w-8 border-zinc-700 px-2 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white sm:h-9 sm:min-w-9"
                        }
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        variant="outline"
                    >
                        Next
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </UIPagination>
    );
};

export default Pagination;

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
                <span
                    className="flex h-8 w-8 items-center justify-center text-zinc-600 sm:h-9 sm:w-9"
                    key={`ellipsis-${ellipsisCount}`}
                >
                    <MoreHorizontalIcon size={16} />
                </span>
            );
        }

        return (
            <Button
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Page ${page}`}
                className={
                    page === currentPage
                        ? "h-8 min-w-8 border-amber-500 bg-amber-500 px-2 font-bold text-zinc-900 sm:h-9 sm:min-w-9"
                        : "h-8 min-w-8 border-zinc-700 px-2 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white sm:h-9 sm:min-w-9"
                }
                key={page}
                onClick={() => onPageChange(page as number)}
            >
                {page}
            </Button>
        );
    });

    return (
        <nav
            aria-label="Pagination"
            className={cn(
                "flex flex-wrap items-center justify-center gap-1 sm:gap-1.5",
                className
            )}
        >
            <Button
                aria-label="Previous page"
                className={
                    currentPage === 1
                        ? "h-8 min-w-8 cursor-not-allowed border-zinc-800 px-2 text-zinc-700 sm:h-9 sm:min-w-9"
                        : "h-8 min-w-8 border-zinc-700 px-2 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white sm:h-9 sm:min-w-9"
                }
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeftIcon size={16} />
            </Button>

            {pageItems}

            <Button
                aria-label="Next page"
                className={
                    currentPage === totalPages
                        ? "h-8 min-w-8 cursor-not-allowed border-zinc-800 px-2 text-zinc-700 sm:h-9 sm:min-w-9"
                        : "h-8 min-w-8 border-zinc-700 px-2 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white sm:h-9 sm:min-w-9"
                }
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <ChevronRightIcon size={16} />
            </Button>
        </nav>
    );
};

export default Pagination;

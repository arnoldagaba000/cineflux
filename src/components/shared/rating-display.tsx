import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCount } from "@/utils/helpers/number";

interface RatingDisplayProps {
    className?: string;
    count?: number;
    showCount?: boolean;
    size?: "sm" | "md" | "lg";
    value: number;
}

function getRatingColor(rating: number): string {
    if (rating >= 8) {
        return "text-emerald-400";
    }
    if (rating >= 7) {
        return "text-amber-400";
    }
    if (rating >= 5) {
        return "text-yellow-500";
    }
    return "text-red-400";
}

const sizeConfig = {
    sm: { star: 12, text: "text-xs", gap: "gap-0.5" },
    md: { star: 14, text: "text-sm", gap: "gap-1" },
    lg: { star: 18, text: "text-base", gap: "gap-1.5" },
};

const RatingDisplay = ({
    value,
    count,
    size = "md",
    showCount = false,
    className,
}: RatingDisplayProps) => {
    const { star, text, gap } = sizeConfig[size];
    const color = getRatingColor(value);

    return (
        <div className={cn("flex items-center", gap, className)}>
            <StarIcon className={cn("fill-current", color)} size={star} />
            <span className={cn("font-semibold tabular-nums", text, color)}>
                {value.toFixed(1)}
            </span>
            
            {showCount && count !== undefined && (
                <span className={cn("text-zinc-500", text)}>
                    ({formatCount(count)})
                </span>
            )}
        </div>
    );
};

export default RatingDisplay;

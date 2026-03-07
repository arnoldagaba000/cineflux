import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/types/ui";
import { Badge } from "../ui/badge";

interface BadgeProps {
    className?: string;
    label: string;
    variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    outline: "bg-transparent text-zinc-300 border border-zinc-600",
    genre: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    rating: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    year: "bg-zinc-800 text-zinc-400 border border-zinc-700",
    status: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};

const BadgeComp = ({ variant = "default", label, className }: BadgeProps) => {
    return (
        <Badge
            className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 font-medium text-xs",
                variantStyles[variant],
                className
            )}
        >
            {label}
        </Badge>
    );
};

export default BadgeComp;

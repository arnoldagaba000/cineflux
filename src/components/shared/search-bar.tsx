import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface SearchBarProps {
    autoFocus?: boolean;
    className?: string;
    onClose: () => void;
    placeholder?: string;
    variant?: "inline" | "modal";
}

const SearchBar = ({
    className,
    placeholder = "Search movies & TV shows...",
    onClose,
    autoFocus = false,
    variant = "inline",
}: SearchBarProps) => {
    return (
        <div className={cn("relative", className)}>
            <div className="relative flex items-center">
                <SearchIcon
                    className="pointer-events-none absolute bottom-3 left-3"
                    size={18}
                />

                <Input
                    autoFocus={autoFocus}
                    className={cn(
                        "mt-3 h-10 rounded-md border border-sidebar-border bg-sidebar px-3 pl-10 text-sm",
                        variant === "modal" && "h-11 text-base"
                    )}
                    id="navbar-search"
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            onClose();
                        }
                    }}
                    placeholder={placeholder}
                    type="search"
                />
                <Label className="sr-only" htmlFor="navbar-search">
                    Search movies and TV series
                </Label>
            </div>
        </div>
    );
};

export default SearchBar;

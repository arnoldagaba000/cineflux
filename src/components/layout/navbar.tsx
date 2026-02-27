import { Link, type LinkOptions } from "@tanstack/react-router";
import {
    BookmarkIcon,
    ClapperboardIcon,
    FilmIcon,
    HomeIcon,
    MenuIcon,
    SearchIcon,
    Tv2Icon,
    XIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SearchBar from "../shared/search-bar";
import { Button } from "../ui/button";

interface NavItemConfig {
    href: LinkOptions["to"];
    icon: ReactNode;
    label: string;
}

const navItems: NavItemConfig[] = [
    { label: "Home", href: "/", icon: <HomeIcon size={18} /> },
    { label: "Movies", href: "/movies", icon: <FilmIcon size={18} /> },
    { label: "TV Series", href: "/tv", icon: <Tv2Icon size={18} /> },
    {
        label: "Bookmarks",
        href: "/bookmarks",
        icon: <BookmarkIcon size={18} />,
    },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        /**
         * Handles window scroll event, and updates isScrolled state accordingly.
         * Checks if window.scrollY is greater than 20, and updates isScrolled state.
         */
        const handleScroll = () => {
            const hasScrolled = window.scrollY > 20;
            setIsScrolled(hasScrolled);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!mobileOpen) {
            return;
        }
        if (typeof document === "undefined") {
            return;
        }

        /**
         * Handles outside clicks on the mobile menu toggle and menu items.
         *
         * If the click event does not originate from within the mobile menu or its toggle,
         * the mobile menu is closed.
         */
        const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
            const targetNode = event.target as Node | null;
            if (!targetNode) {
                return;
            }

            const clickedInsideMenu =
                mobileMenuRef.current?.contains(targetNode) ?? false;
            const clickedToggle =
                mobileToggleRef.current?.contains(targetNode) ?? false;

            if (!(clickedInsideMenu || clickedToggle)) {
                setMobileOpen(false);
            }
        };

        const passiveTouchOptions: AddEventListenerOptions = { passive: true };
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener(
            "touchstart",
            handleOutsideClick,
            passiveTouchOptions
        );

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("touchstart", handleOutsideClick);
        };
    }, [mobileOpen]);

    return (
        <>
            <header
                className={cn(
                    "sticky inset-x-0 top-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "border-sidebar-border border-b shadow-xl backdrop-blur-md"
                        : "bg-linear-to-b from-sidebar to-transparent"
                )}
            >
                <nav className="items-center-safe mx-auto flex h-16 max-w-full justify-between px-4 md:px-8 lg:px-12">
                    {/* Logo */}
                    <Link className="group flex items-center gap-2" to="/">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500 shadow-amber-500/30 shadow-lg transition-colors group-hover:bg-amber-400">
                            <ClapperboardIcon
                                className="text-zinc-900 group-hover:animate-pulse"
                                size={18}
                            />
                        </div>
                        <span className="hidden font-black text-lg tracking-tight sm:block">
                            Cine<span className="text-amber-500">Flux</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="items-center-safe hidden gap-1 md:flex">
                        {navItems.map((item) => (
                            <Link
                                activeProps={{
                                    className: "text-amber-400 bg-amber-500/10",
                                }}
                                className="relative flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-sm transition-all duration-200"
                                inactiveProps={{
                                    className:
                                        "text-zinc-400 hover:text-white hover:bg-zinc-800",
                                }}
                                key={item.href}
                                to={item.href}
                            >
                                {item.icon}
                                {item.label}

                                {/* TODO: Add bookmark indicator */}
                            </Link>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            aria-label="Toggle search"
                            aria-pressed={isSearchOpen}
                            className="flex size-9 items-center justify-center transition-all"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            variant="secondary"
                        >
                            {isSearchOpen ? (
                                <XIcon size={18} />
                            ) : (
                                <SearchIcon size={18} />
                            )}
                        </Button>

                        {/* Mobile Nav Toggle */}
                        <Button
                            aria-label="Toggle menu"
                            className="flex size-9 items-center justify-center transition-all md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            ref={mobileToggleRef}
                            variant="secondary"
                        >
                            {mobileOpen ? (
                                <XIcon size={20} />
                            ) : (
                                <MenuIcon size={20} />
                            )}
                        </Button>
                    </div>
                </nav>

                {isSearchOpen && (
                    <div className="border-sidebar-border border-t px-4 pb-4 md:px-8 lg:px-12">
                        <div className="mx-auto max-w-2xl">
                            <SearchBar
                                onClose={() => setIsSearchOpen(false)}
                                placeholder="Search movies, TV shows..."
                            />
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <div
                    className="fixed inset-x-0 top-16 z-40 border-sidebar-border border-b bg-sidebar/95 px-4 py-3 shadow-xl backdrop-blur-md md:hidden"
                    ref={mobileMenuRef}
                >
                    <div className="mx-auto flex max-w-full flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                activeProps={{
                                    className:
                                        "text-amber-400 bg-amber-500/10 border-amber-500/40",
                                }}
                                className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 font-medium text-sm transition-colors"
                                inactiveProps={{
                                    className:
                                        "text-zinc-300 hover:bg-zinc-800 hover:text-white",
                                }}
                                key={`mobile-${item.label}`}
                                onClick={() => setMobileOpen(false)}
                                to={item.href}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;

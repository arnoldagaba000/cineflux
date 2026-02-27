import { Link, type LinkOptions } from "@tanstack/react-router";
import {
    BookmarkIcon,
    ClapperboardIcon,
    FilmIcon,
    HomeIcon,
    MenuIcon,
    Tv2Icon,
    XIcon,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    });

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
                        {/* Search Toggle */}
                        {/* TODO: Add search button to toggle search */}

                        {/* Mobile Nav Toggle */}
                        <Button
                            aria-label="Toggle menu"
                            className="flex size-9 items-center justify-center transition-all md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
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

                {/* Search bar */}
            </header>

            {/* Mobile Navigation */}
            {/* TODO: Add mobile navigation */}
            {mobileOpen && <div className="" />}
        </>
    );
};

export default Navbar;

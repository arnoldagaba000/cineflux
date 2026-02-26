import type { FilterState, MediaCategory, NormalizedMedia } from "./ui";

// ─── Bookmark Store Types ─────────────────────────────────────────────────────

export interface BookmarkEntry {
    id: number;
    mediaType: MediaCategory;
    media: NormalizedMedia;
    bookmarkedAt: string; // ISO timestamp
}

export interface BookmarkStore {
    bookmarks: BookmarkEntry[];

    // Actions
    addBookmark: (media: NormalizedMedia) => void;
    removeBookmark: (id: number, mediaType: MediaCategory) => void;
    toggleBookmark: (media: NormalizedMedia) => void;
    isBookmarked: (id: number, mediaType: MediaCategory) => boolean;
    getBookmarksByType: (mediaType: MediaCategory) => BookmarkEntry[];
    clearBookmarks: () => void;
}

// ─── Auth Store Types ─────────────────────────────────────────────────────────

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
    createdAt: string;
}

export interface AuthStore {
    user: User | null;
    status: AuthStatus;
    token: string | null;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setStatus: (status: AuthStatus) => void;
    logout: () => void;
}

// ─── UI Store Types ───────────────────────────────────────────────────────────

export interface UIStore {
    sidebarOpen: boolean;
    searchOpen: boolean;
    activeModal: string | null;
    theme: "dark" | "light";

    // Actions
    toggleSidebar: () => void;
    setSearchOpen: (open: boolean) => void;
    openModal: (id: string) => void;
    closeModal: () => void;
    setTheme: (theme: "dark" | "light") => void;
}

// ─── Filter Store Types ───────────────────────────────────────────────────────

export interface FilterStore {
    movieFilters: FilterState;
    tvFilters: FilterState;

    // Actions
    setMovieFilters: (filters: Partial<FilterState>) => void;
    setTVFilters: (filters: Partial<FilterState>) => void;
    resetMovieFilters: () => void;
    resetTVFilters: () => void;
}
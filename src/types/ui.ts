// ─── Media Card Types ─────────────────────────────────────────────────────────

export type MediaCategory = "movie" | "tv";

export interface NormalizedMedia {
    backdropPath: string | null;
    genreIds: number[];
    id: number;
    mediaType: MediaCategory;
    originalLanguage: string;
    overview: string;
    popularity: number;
    posterPath: string | null;
    releaseDate: string;
    title: string;
    voteAverage: number;
    voteCount: number;
}

export interface MediaCardProps {
    className?: string;
    media: NormalizedMedia;
    variant?: "default" | "featured" | "compact" | "hero";
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavItem {
    href: string;
    icon?: string;
    label: string;
}

export type NavPage = "home" | "movies" | "tv" | "bookmarks";

// ─── Search Types ─────────────────────────────────────────────────────────────

export interface SearchState {
    isLoading: boolean;
    isOpen: boolean;
    query: string;
    results: NormalizedMedia[];
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export type SortOption =
    | "popularity.desc"
    | "popularity.asc"
    | "release_date.desc"
    | "release_date.asc"
    | "vote_average.desc"
    | "vote_average.asc";

export interface FilterState {
    genre: number | null;
    page: number;
    sortBy: SortOption;
    year: number | null;
}

export interface GenreFilterOption {
    id: number;
    name: string;
}

// ─── Pagination Types ─────────────────────────────────────────────────────────

export interface PaginationState {
    currentPage: number;
    totalPages: number;
    totalResults: number;
}

// ─── Toast / Notification Types ───────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastMessage {
    description?: string;
    duration?: number;
    id: string;
    title: string;
    variant: ToastVariant;
}

// ─── Modal Types ──────────────────────────────────────────────────────────────

export interface ModalState {
    isOpen: boolean;
    mediaId: number | null;
    mediaType: MediaCategory | null;
}

// ─── Layout Types ─────────────────────────────────────────────────────────────

export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6;

export interface GridConfig {
    lg?: GridCols;
    md?: GridCols;
    sm?: GridCols;
    xl?: GridCols;
    xs?: GridCols;
}

// ─── Image Types ──────────────────────────────────────────────────────────────

export interface ImageWithFallbackProps {
    alt: string;
    className?: string;
    fallback?: string;
    sizes?: string;
    src: string | null;
}

// ─── Badge / Tag Types ────────────────────────────────────────────────────────

export type BadgeVariant =
    | "default"
    | "outline"
    | "genre"
    | "rating"
    | "year"
    | "status";

export interface BadgeProps {
    className?: string;
    label: string;
    variant?: BadgeVariant;
}

// ─── Rating Types ─────────────────────────────────────────────────────────────

export type RatingSize = "sm" | "md" | "lg";

export interface RatingDisplayProps {
    count?: number;
    showCount?: boolean;
    size?: RatingSize;
    value: number;
}

// ─── Hero Section Types ───────────────────────────────────────────────────────

export interface HeroMedia extends NormalizedMedia {
    genres?: string[];
    runtime?: number;
    tagline?: string;
    trailerKey?: string | null;
}

// ─── Carousel Types ───────────────────────────────────────────────────────────

export interface CarouselConfig {
    autoplay?: boolean;
    autoplayDelay?: number;
    loop?: boolean;
    slidesPerView?: number;
    spaceBetween?: number;
}

// ─── Skeleton / Loading Types ─────────────────────────────────────────────────

export interface SkeletonProps {
    className?: string;
    variant?: "card" | "text" | "circle" | "hero";
}

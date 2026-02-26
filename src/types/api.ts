import type { BookmarkEntry } from "./bookmark";
import type { Media, MediaType } from "./media";

export interface APIError {
    code?: string;
    details?: unknown;
    message: string;
    status: number;
}

export interface SearchRequest {
    includeAdult?: boolean;
    page?: number;
    q: string;
}

export interface SearchResponse {
    page: number;
    results: Media[];
    totalPages: number;
}

export interface GetMediaResponse {
    media: Media;
}

export interface BookmarkListResponse {
    bookmarks: BookmarkEntry[];
}

export interface ToggleBookmarkRequest {
    mediaId: number;
    mediaType: MediaType; // 'movie' | 'tv'
}

export interface ToggleBookmarkResponse {
    bookmark?: BookmarkEntry; // returned if added
    removed?: boolean; // true if removed
}

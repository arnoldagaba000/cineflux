import type { MediaType } from "./media";

export type BookmarkId = string; // e.g., `${mediaType}:${id}`

export interface BookmarkEntry {
    addedAt: string; // ISO timestamp
    id: BookmarkId; // composite key
    mediaId: number; // TMDB id
    mediaType: MediaType;
    note?: string | null; // optional user note
    posterPath?: string | null;
    title: string;
    // If persisted server-side:
    userId?: string;
}

export interface BookmarksState {
    add: (entry: BookmarkEntry) => void;
    entries: Record<BookmarkId, BookmarkEntry>;
    has: (id: BookmarkId) => boolean;
    remove: (id: BookmarkId) => void;
}

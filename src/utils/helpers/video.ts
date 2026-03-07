import type { TMDBVideo } from "@/types/tmdb";

const TRAILER_TYPES = new Set(["Trailer", "Teaser"]);

export function getPreferredTrailer(
    videos: TMDBVideo[] | null | undefined
): TMDBVideo | null {
    if (!videos?.length) {
        return null;
    }

    return (
        videos.find(
            (video) =>
                video.site === "YouTube" &&
                video.official &&
                video.type === "Trailer"
        ) ??
        videos.find(
            (video) =>
                video.site === "YouTube" &&
                video.official &&
                video.type === "Teaser"
        ) ??
        videos.find(
            (video) => video.site === "YouTube" && TRAILER_TYPES.has(video.type)
        ) ??
        null
    );
}

export function getYouTubeWatchUrl(videoKey: string | null | undefined) {
    if (!videoKey) {
        return null;
    }

    const sanitizedVideoKey = encodeURIComponent(videoKey);

    return `https://www.youtube.com/watch?v=${sanitizedVideoKey}`;
}

export function getYouTubeEmbedUrl(videoKey: string | null | undefined) {
    if (!videoKey) {
        return null;
    }

    const sanitizedVideoKey = encodeURIComponent(videoKey);

    return `https://www.youtube-nocookie.com/embed/${sanitizedVideoKey}`;
}

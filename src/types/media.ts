import type { TMDBCredits, TMDBGenre, TMDBVideo } from "./tmdb";

export type MediaType = "movie" | "tv";

export interface Rating {
    average: number; // 0-10 from TMDB
    count: number;
}

export interface BaseMedia {
    backdropPath?: string | null;
    credits?: TMDBCredits;
    genres?: TMDBGenre[];
    id: number;
    mediaType: MediaType;
    originalTitle?: string;
    overview?: string | null;
    popularity?: number;
    posterPath?: string | null;
    rating?: Rating;
    releaseDate?: string | null; // release_date or first_air_date
    runtime?: number | null; // minutes (movie) or typical ep length (tv)
    title: string; // title or name
    videos?: TMDBVideo[];
}

export type MovieMedia = BaseMedia & {
    mediaType: "movie";
    runtime?: number | null;
};

export type TVMedia = BaseMedia & {
    mediaType: "tv";
    numberOfSeasons?: number;
    numberOfEpisodes?: number;
    episodeRunTime?: number[] | null;
};

export type Media = MovieMedia | TVMedia;

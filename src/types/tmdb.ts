export interface TMDBImage {
    aspect_ratio?: number;
    file_path: string | null;
    height?: number | null;
    iso_639_1?: string | null;
    vote_average?: number;
    vote_count?: number;
    width?: number | null;
}

export interface TMDBGenre {
    id: number;
    name: string;
}

export interface TMDBProductionCompany {
    id: number;
    logo_path?: string | null;
    name: string;
    origin_country?: string;
}

export interface TMDBPerson {
    id: number;
    name: string;
    profile_path?: string | null;
    character?: string;
    job?: string;
    known_for_department?: string;
};

export interface TMDBVideo {
    id: string;
    iso_639_1?: string;
    iso_3166_1?: string;
    key: string; // e.g., youtube key
    name: string;
    site: string; // "YouTube"
    size: number;
    type: string; // "Trailer", "Teaser"
}

export interface TMDBCredits {
    cast: TMDBPerson[];
    crew: TMDBPerson[];
}

export interface TMDBMovieResult {
    adult?: boolean;
    backdrop_path?: string | null;
    genre_ids?: number[];
    id: number;
    original_language?: string;
    original_title?: string;
    overview?: string | null;
    popularity?: number;
    poster_path?: string | null;
    release_date?: string; // "YYYY-MM-DD"
    title?: string;
    vote_average?: number;
    vote_count?: number;
    // extended fields when you request /movie/{id}
    genres?: TMDBGenre[];
    runtime?: number | null;
    videos?: { results: TMDBVideo[] };
    credits?: TMDBCredits;
    images?: { backdrops: TMDBImage[]; posters: TMDBImage[] };
}

export interface TMDBTVResult {
    backdrop_path?: string | null;
    first_air_date?: string;
    genre_ids?: number[];
    id: number;
    name?: string;
    origin_country?: string[];
    original_language?: string;
    original_name?: string;
    overview?: string | null;
    popularity?: number;
    poster_path?: string | null;
    vote_average?: number;
    vote_count?: number;
    // extended
    genres?: TMDBGenre[];
    episode_run_time?: number[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    videos?: { results: TMDBVideo[] };
    credits?: TMDBCredits;
    images?: { backdrops: TMDBImage[]; posters: TMDBImage[] };
}

export interface TMDBPagedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export type TMDBSearchResponse = TMDBPagedResponse<
    TMDBMovieResult | TMDBTVResult
>;
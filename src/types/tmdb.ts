// ─── TMDB Base Types ──────────────────────────────────────────────────────────

export type TMDBImageSize =
    | "w45"
    | "w92"
    | "w154"
    | "w185"
    | "w300"
    | "w342"
    | "w500"
    | "w780"
    | "w1280"
    | "original";

export type TMDBMediaType = "movie" | "tv" | "person";

export type TMDBTimeWindow = "day" | "week";

// ─── Genre ────────────────────────────────────────────────────────────────────

export interface TMDBGenre {
    id: number;
    name: string;
}

export interface TMDBGenreListResponse {
    genres: TMDBGenre[];
}

// ─── Production Types ─────────────────────────────────────────────────────────

export interface TMDBProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface TMDBProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface TMDBSpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

// ─── Cast & Crew ──────────────────────────────────────────────────────────────

export interface TMDBCastMember {
    character: string;
    credit_id: string;
    gender: number | null;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    popularity: number;
    profile_path: string | null;
}

export interface TMDBCrewMember {
    credit_id: string;
    department: string;
    gender: number | null;
    id: number;
    job: string;
    name: string;
    popularity: number;
    profile_path: string | null;
}

export interface TMDBCredits {
    cast: TMDBCastMember[];
    crew: TMDBCrewMember[];
    id: number;
}

// ─── Video Types ──────────────────────────────────────────────────────────────

export type TMDBVideoType =
    | "Trailer"
    | "Teaser"
    | "Clip"
    | "Featurette"
    | "Behind the Scenes"
    | "Bloopers";

export type TMDBVideoSite = "YouTube" | "Vimeo";

export interface TMDBVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: TMDBVideoSite;
    size: 360 | 480 | 720 | 1080;
    type: TMDBVideoType;
}

export interface TMDBVideosResponse {
    id: number;
    results: TMDBVideo[];
}

// ─── Image Types ──────────────────────────────────────────────────────────────

export interface TMDBImage {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface TMDBImagesResponse {
    backdrops: TMDBImage[];
    id: number;
    logos: TMDBImage[];
    posters: TMDBImage[];
}

// ─── Movie Types ──────────────────────────────────────────────────────────────

export interface TMDBMovieBase {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    media_type?: "movie";
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TMDBMovieDetail extends Omit<TMDBMovieBase, "genre_ids"> {
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
    } | null;
    budget: number;
    genres: TMDBGenre[];
    homepage: string | null;
    imdb_id: string | null;
    production_companies: TMDBProductionCompany[];
    production_countries: TMDBProductionCountry[];
    revenue: number;
    runtime: number | null;
    spoken_languages: TMDBSpokenLanguage[];
    status:
        | "Rumored"
        | "Planned"
        | "In Production"
        | "Post Production"
        | "Released"
        | "Canceled";
    tagline: string | null;
}

// ─── TV Series Types ───────────────────────────────────────────────────────────

export interface TMDBTVCreator {
    credit_id: string;
    gender: number | null;
    id: number;
    name: string;
    profile_path: string | null;
}

export interface TMDBTVEpisode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
}

export interface TMDBTVSeason {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
}

export interface TMDBTVNetwork {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

export interface TMDBTVBase {
    backdrop_path: string | null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    media_type?: "tv";
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
}

export interface TMDBTVDetail extends Omit<TMDBTVBase, "genre_ids"> {
    created_by: TMDBTVCreator[];
    episode_run_time: number[];
    genres: TMDBGenre[];
    homepage: string | null;
    in_production: boolean;
    languages: string[];
    last_air_date: string | null;
    last_episode_to_air: TMDBTVEpisode | null;
    networks: TMDBTVNetwork[];
    next_episode_to_air: TMDBTVEpisode | null;
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: TMDBProductionCompany[];
    production_countries: TMDBProductionCountry[];
    seasons: TMDBTVSeason[];
    spoken_languages: TMDBSpokenLanguage[];
    status:
        | "Returning Series"
        | "Planned"
        | "In Production"
        | "Ended"
        | "Canceled"
        | "Pilot";
    tagline: string | null;
    type: string;
}

// ─── Person Types ─────────────────────────────────────────────────────────────

export interface TMDBPersonKnownFor {
    id: number;
    media_type: "movie" | "tv";
    name?: string;
    poster_path: string | null;
    title?: string;
    vote_average: number;
}

export interface TMDBPerson {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for: TMDBPersonKnownFor[];
    known_for_department: string;
    media_type?: "person";
    name: string;
    popularity: number;
    profile_path: string | null;
}

// ─── Trending ─────────────────────────────────────────────────────────────────

export type TMDBTrendingItem =
    | (TMDBMovieBase & { media_type: "movie" })
    | (TMDBTVBase & { media_type: "tv" })
    | (TMDBPerson & { media_type: "person" });

// ─── Paginated Responses ──────────────────────────────────────────────────────

export interface TMDBPaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export type TMDBMovieListResponse = TMDBPaginatedResponse<TMDBMovieBase>;
export type TMDBTVListResponse = TMDBPaginatedResponse<TMDBTVBase>;
export type TMDBTrendingResponse = TMDBPaginatedResponse<TMDBTrendingItem>;
export type TMDBSearchMultiResponse = TMDBPaginatedResponse<TMDBTrendingItem>;

// ─── Search Types ─────────────────────────────────────────────────────────────

export interface TMDBSearchMovieResponse
    extends TMDBPaginatedResponse<TMDBMovieBase> {}

export interface TMDBSearchTVResponse
    extends TMDBPaginatedResponse<TMDBTVBase> {}

export interface TMDBSearchMultiResult
    extends TMDBPaginatedResponse<TMDBTrendingItem> {}

// ─── Configuration ────────────────────────────────────────────────────────────

export interface TMDBImageConfig {
    backdrop_sizes: string[];
    base_url: string;
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    secure_base_url: string;
    still_sizes: string[];
}

export interface TMDBConfiguration {
    change_keys: string[];
    images: TMDBImageConfig;
}

// ─── Discover Params ──────────────────────────────────────────────────────────

export interface TMDBDiscoverMovieParams {
    include_adult?: boolean;
    language?: string;
    page?: number;
    sort_by?:
        | "popularity.desc"
        | "popularity.asc"
        | "release_date.desc"
        | "release_date.asc"
        | "vote_average.desc"
        | "vote_average.asc"
        | "vote_count.desc";
    with_genres?: string;
    year?: number;
}

export interface TMDBDiscoverTVParams {
    first_air_date_year?: number;
    language?: string;
    page?: number;
    sort_by?:
        | "popularity.desc"
        | "popularity.asc"
        | "first_air_date.desc"
        | "first_air_date.asc"
        | "vote_average.desc"
        | "vote_average.asc";
    with_genres?: string;
}

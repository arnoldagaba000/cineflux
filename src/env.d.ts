/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TMDB_API_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// Server-side env (accessed via process.env)
// biome-ignore lint/style/noNamespace: <explanation>
declare namespace NodeJS {
    interface ProcessEnv {
        // Database
        DATABASE_URL?: string;

        // JWT
        JWT_EXPIRES_IN?: string;
        JWT_SECRET?: string;

        // Node
        NODE_ENV: "development" | "production" | "test";

        // Session
        SESSION_SECRET?: string;

        // TMDB
        TMDB_API_ACCESS_TOKEN: string;
        TMDB_API_KEY: string;
        TMDB_BASE_URL: string;
        TMDB_IMAGE_BASE_URL: string;
        TMDB_LANGUAGE: string;
        TMDB_REGION: string;
    }
}

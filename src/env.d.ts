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
        // Database (optional - for full auth implementation)
        DATABASE_URL?: string;
        JWT_EXPIRES_IN?: string;
        // JWT (optional - for full auth implementation)
        JWT_SECRET?: string;
        NODE_ENV: "development" | "production" | "test";
        // Session
        SESSION_SECRET?: string;
        TMDB_API_KEY: string;
    }
}

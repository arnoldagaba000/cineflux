import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
    server: {
        API_READ_ACCESS_TOKEN: z.string(),
        API_KEY: z.string(),
        TMDB_BASE_URL: z.url().default("https://api.themoviedb.org/3"),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});

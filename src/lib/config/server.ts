import { createServerFn } from "@tanstack/react-start";
import type { Configuration } from "#/types/configuration-ancillary";
import tmdbClient from "./client";

const fetchTmdbConfig = createServerFn({ method: "GET" }).handler(
    async (): Promise<Configuration> => {
        const { data } = await tmdbClient.get<Configuration>("/configuration");
        return data;
    }
);

export default fetchTmdbConfig;

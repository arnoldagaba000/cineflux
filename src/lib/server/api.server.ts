import axios from "axios";
import { env } from "../env/server";

const client = axios.create({
    baseURL: env.TMDB_BASE_URL,
    timeout: 15_000,
    headers: {
        Accept: "application/json",
    },
});

client.interceptors.request.use((config) => {
    config.params = {
        ...(config.params ?? {}),
        api_key: env.API_KEY,
    };
    return config;
});

export default client;
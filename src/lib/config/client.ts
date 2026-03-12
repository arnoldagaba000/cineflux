import axios from "axios";
import { env } from "../env/server";

const tmdbClient = axios.create({
    baseURL: env.TMDB_BASE_URL,
    timeout: 15_000,
    headers: {
        Authorization: `Bearer ${env.API_READ_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    },
});

tmdbClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response) {
            const { config, status, statusText } = error.response;

            return Promise.reject(
                new Error(
                    `TMDB request failed: ${status} ${statusText} - ${config?.url}`
                )
            );
        }

        return Promise.reject(error);
    }
);

export default tmdbClient;
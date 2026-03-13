import { createServerFn } from "@tanstack/react-start";
import tmdbClient from "#/lib/config/client";
import type { Paginated } from "#/types/pagination-search";
import type { PersonSummary } from "#/types/person";
import { PersonListSchema } from "./schema";

export const getPopularPersons = createServerFn()
    .inputValidator(PersonListSchema)
    .handler(async ({ data }) => {
        const result = await tmdbClient.get<Paginated<PersonSummary>>(
            "/person/popular",
            {
                params: data,
            }
        );
        return result.data;
    });

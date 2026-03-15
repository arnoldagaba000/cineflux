import { queryOptions } from "@tanstack/react-query";
import { TMDB_KEYS } from "#/lib/query/keys";
import { queryPolicies } from "#/lib/query/policies";
import { getPopularPersons } from "./functions";
import type { PersonListParams } from "./schema";
import { PersonListSchema } from "./schema";

const normalizeListParams = (params?: PersonListParams) =>
    PersonListSchema.parse(params ?? {});

export const popularPersonsQueryOptions = (params?: PersonListParams) => {
    const data = normalizeListParams(params);
    return queryOptions({
        queryKey: TMDB_KEYS.persons.popular(data),
        queryFn: () => getPopularPersons({ data }),
        ...queryPolicies.lists,
    });
};

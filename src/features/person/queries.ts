import { queryOptions } from "@tanstack/react-query";
import { TMDB_KEYS } from "#/lib/query/keys";
import { queryPolicies } from "#/lib/query/policies";
import { getPopularPersons } from "./functions";
import type { PersonListParams } from "./schema";

export const popularPersonsQueryOptions = (params: PersonListParams) =>
    queryOptions({
        queryKey: TMDB_KEYS.persons.popular(params),
        queryFn: () => getPopularPersons({ data: params }),
        ...queryPolicies.lists,
    });

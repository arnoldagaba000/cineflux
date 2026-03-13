import { queryOptions } from "@tanstack/react-query";
import fetchTmdbConfig from "#/lib/config/server";
import { TMDB_KEYS } from "#/lib/query/keys";
import { queryPolicies } from "#/lib/query/policies";

export const configQueryOptions = queryOptions({
    queryKey: TMDB_KEYS.config,
    queryFn: () => fetchTmdbConfig(),
    ...queryPolicies.config,
});

import type { DefaultOptions } from "@tanstack/react-query";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export const queryPolicies: {
    readonly config: DefaultOptions["queries"];
    readonly static: DefaultOptions["queries"];
    readonly metadata: DefaultOptions["queries"];
    readonly lists: DefaultOptions["queries"];
    readonly search: DefaultOptions["queries"];
    readonly live: DefaultOptions["queries"];
} = {
    config: {
        staleTime: Number.POSITIVE_INFINITY,
        gcTime: DAY * 7,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: 0,
    },
    static: {
        staleTime: HOUR * 24,
        gcTime: DAY * 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
        retry: 1,
    },
    metadata: {
        staleTime: MIN * 10,
        gcTime: HOUR,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
        retry: 2,
        structuralSharing: true,
    },
    lists: {
        staleTime: MIN * 5,
        gcTime: 30 * MIN,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
        retry: 2,
        structuralSharing: true,
    },
    search: {
        staleTime: 60 * 1000,
        gcTime: 5 * MIN,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,
        retry: 1,
    },
    live: {
        staleTime: 15 * 1000,
        gcTime: 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,
        retry: 1,
        refetchInterval: 30 * 1000,
        refetchIntervalInBackground: false,
    },
};

import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { getContext } from "./integrations/react-query";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
    const router = createTanStackRouter({
        routeTree,

        context: getContext(),

        scrollRestoration: true,
        defaultPreload: "intent",
        defaultPreloadStaleTime: 0,
    });

    setupRouterSsrQueryIntegration({
        router,
        queryClient: getContext().queryClient,
    });

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof getRouter>;
    }
}

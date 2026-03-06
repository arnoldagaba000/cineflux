import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
    createRootRouteWithContext,
    HeadContent,
    Scripts,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import devPlugins from "@/integrations/dev-tools";
import TanStackQueryProvider from "@/integrations/react-query";
import appCss from "../styles.css?url";

interface MyRouterContext {
    queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "CineFlux — Your Cinema Universe",
            },
            {
                name: "description",
                content:
                    "Discover movies, TV shows, and actors with CineFlux. Explore your cinema universe with personalized recommendations, watchlists, and more.",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>

            <body>
                <TanStackQueryProvider>
                    <ThemeProvider
                        attribute="class"
                        enableColorScheme
                        enableSystem
                        storageKey="cineflux-theme"
                    >
                        <TooltipProvider>
                            <div className="flex min-h-screen flex-col scroll-smooth">
                                <Navbar />

                                <main className="flex-1 pt-3">{children}</main>
                            </div>
                        </TooltipProvider>
                    </ThemeProvider>

                    <Toaster position="bottom-left" />

                    <TanStackDevtools
                        config={{
                            position: "bottom-right",
                        }}
                        plugins={devPlugins}
                    />
                </TanStackQueryProvider>

                <Scripts />
            </body>
        </html>
    );
}

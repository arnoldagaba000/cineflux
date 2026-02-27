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
                title: "Cineflux",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    notFoundComponent: NotFoundPage,
    shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>

            <body suppressHydrationWarning>
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

                                <main className="flex-1 px-4 pt-3">
                                    {children}
                                </main>
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

function NotFoundPage() {
    return (
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-3 py-16 text-center">
            <h1 className="font-bold text-2xl">Page not found</h1>
            <p className="text-muted-foreground">
                The page you requested does not exist.
            </p>
            <a
                className="text-amber-500 underline-offset-4 hover:underline"
                href="/"
            >
                Go back home
            </a>
        </section>
    );
}

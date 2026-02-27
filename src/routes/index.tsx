import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: HomePage,
    head: () => ({
        meta: [
            { title: "CineFlux — Discover Movies & TV Shows" },
            {
                name: "description",
                content:
                    "Explore trending movies and TV shows. Discover new entertainment and bookmark your favorites.",
            },
        ],
    }),
});

function HomePage() {
    return <div className="min-h-screen">Hello "/"!</div>;
}

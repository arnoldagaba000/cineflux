import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link, useRouter } from "@tanstack/react-router";
import {
    AlertTriangleIcon,
    ClapperboardIcon,
    HomeIcon,
    RotateCcwIcon,
    SearchXIcon,
} from "lucide-react";
import type { ReactNode } from "react";

const primaryActionClassName =
    "inline-flex h-10 items-center gap-2 rounded-lg bg-amber-500 px-4 font-semibold text-sm text-zinc-900 transition-colors hover:bg-amber-400";
const secondaryActionClassName =
    "inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 font-medium text-sm text-zinc-100 transition-colors hover:bg-zinc-700";

function FallbackShell({
    children,
    eyebrow,
}: {
    children: ReactNode;
    eyebrow: string;
}) {
    return (
        <main className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.12),transparent_48%)]" />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-zinc-900/40 via-zinc-950 to-zinc-950" />

            <section className="relative z-10 w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-semibold text-[11px] text-amber-300 uppercase tracking-wider">
                    <ClapperboardIcon size={14} />
                    {eyebrow}
                </div>
                {children}
            </section>
        </main>
    );
}

function ActionRow({ children }: { children: ReactNode }) {
    return <div className="flex flex-wrap gap-2.5">{children}</div>;
}

function DevErrorDetails({
    error,
    info,
}: Pick<ErrorComponentProps, "error" | "info">) {
    if (!import.meta.env.DEV) {
        return null;
    }

    return (
        <details className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 text-xs text-zinc-300">
            <summary className="cursor-pointer font-semibold text-zinc-100">
                Technical details
            </summary>
            <pre className="wrap-break-word mt-3 overflow-x-auto whitespace-pre-wrap text-zinc-400">
                {error instanceof Error ? error.message : String(error)}
                {info?.componentStack ? `\n\n${info.componentStack}` : ""}
            </pre>
        </details>
    );
}

export function NotFoundFallback() {
    const router = useRouter();
    const handleGoBack = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            router.history.back();
            return;
        }

        router.navigate({ to: "/" });
    };

    return (
        <FallbackShell eyebrow="404 Not Found">
            <div className="mb-4 flex items-center gap-3 text-white">
                <div className="rounded-xl bg-zinc-800/80 p-2.5 text-amber-400">
                    <SearchXIcon size={20} />
                </div>
                <h1 className="font-black text-2xl tracking-tight sm:text-3xl">
                    This Page Drifted Off Screen
                </h1>
            </div>

            <p className="mb-7 text-sm text-zinc-300 leading-relaxed sm:text-base">
                The link may be outdated or the page may have moved. Jump back
                into CineFlux and keep exploring.
            </p>

            <ActionRow>
                <Link className={primaryActionClassName} to="/">
                    <HomeIcon size={16} />
                    Go Home
                </Link>
                <button
                    className={secondaryActionClassName}
                    onClick={handleGoBack}
                    type="button"
                >
                    <RotateCcwIcon size={16} />
                    Go Back
                </button>
            </ActionRow>
        </FallbackShell>
    );
}

export function ErrorFallback({ error, info, reset }: ErrorComponentProps) {
    return (
        <FallbackShell eyebrow="Route Error">
            <div className="mb-4 flex items-center gap-3 text-white">
                <div className="rounded-xl bg-red-500/15 p-2.5 text-red-300">
                    <AlertTriangleIcon size={20} />
                </div>
                <h1 className="font-black text-2xl tracking-tight sm:text-3xl">
                    Something Went Wrong
                </h1>
            </div>

            <p className="mb-7 text-sm text-zinc-300 leading-relaxed sm:text-base">
                We hit an unexpected issue while loading this view. Try again,
                or return home and continue browsing.
            </p>

            <div className="mb-6">
                <ActionRow>
                    <button
                        className={primaryActionClassName}
                        onClick={reset}
                        type="button"
                    >
                        <RotateCcwIcon size={16} />
                        Try Again
                    </button>
                    <Link className={secondaryActionClassName} to="/">
                        <HomeIcon size={16} />
                        Go Home
                    </Link>
                </ActionRow>
            </div>

            <DevErrorDetails error={error} info={info} />
        </FallbackShell>
    );
}

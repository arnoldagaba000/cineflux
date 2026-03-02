"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

function Label({
    className,
    htmlFor,
    ...props
}: React.ComponentProps<"label">) {
    const sharedClassName = cn(
        "flex select-none items-center gap-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        className
    );

    if (!htmlFor) {
        return (
            <span className={sharedClassName} data-slot="label" {...props} />
        );
    }

    return (
        /* biome-ignore lint/a11y/noLabelWithoutControl: htmlFor is provided via component props */
        <label
            className={sharedClassName}
            data-slot="label"
            htmlFor={htmlFor}
            {...props}
        />
    );
}

export { Label };

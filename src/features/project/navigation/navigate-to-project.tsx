import { Link } from "@tanstack/react-router";

import type { ReactNode } from "react";


interface NavigateToProjectProps {
    slug: string;
    className?: string;
    children: ReactNode;
}

function NavigateToProject({
    slug,
    className,
    children
}: NavigateToProjectProps) {
    return (
        <Link to="/projects/$slug" reloadDocument={true} params={{ slug }} className={className}>
            {children}
        </Link>
    );
}

export { NavigateToProject };
export type { NavigateToProjectProps };

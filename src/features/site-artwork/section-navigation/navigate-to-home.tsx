import { Link, useRouterState } from "@tanstack/react-router";

import type { MouseEvent, ReactNode } from "react";


interface NavigateToHomeProps {
    label: string;
    className?: string;
    children: ReactNode;
}

function NavigateToHome({
    label,
    className,
    children
}: NavigateToHomeProps) {
    const isHome = useRouterState({
        select: (state) => state.location.pathname === "/"
    });

    const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
        if (isHome) {
            event.preventDefault();
            window.history.replaceState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Link
            to="/"
            aria-label={label}
            title={label}
            onClick={scrollToTop}
            className={className}
        >
            {children}
        </Link>
    );
}

export { NavigateToHome };
export type { NavigateToHomeProps };

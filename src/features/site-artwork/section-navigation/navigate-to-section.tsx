import { Link } from "@tanstack/react-router";

import type { SiteSection } from "@entities/site-artwork/model";
import type { ReactNode } from "react";


interface NavigateToSectionProps {
    section: SiteSection;
    className?: string;
    children: ReactNode;
}

function NavigateToSection({
    section,
    className,
    children
}: NavigateToSectionProps) {
    return (
        <Link
            to="/"
            hash={section}
            activeOptions={{ includeHash: true }}
            className={className}
        >
            {children}
        </Link>
    );
}

export { NavigateToSection };
export type { NavigateToSectionProps };

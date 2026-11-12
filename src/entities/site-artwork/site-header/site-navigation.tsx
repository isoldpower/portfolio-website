import { cn } from "@shared/lib/utilities";
import { UnorderedList } from "@shared/lib/components";
import { SITE_SECTIONS } from "../model";

import type { SiteSection } from "../model";
import type { HTMLAttributes, ReactNode } from "react";


type SiteNavigationProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
    children: (section: SiteSection) => ReactNode;
};

function SiteNavigation({
    className,
    children,
    ...props
}: SiteNavigationProps) {
    return (
        <nav
            className={cn(
                "min-w-0 overflow-x-auto scrollbar-none",
                "lg:overflow-visible lg:text-shadow-nav",
                className
            )}
            {...props}
        >
            <UnorderedList
                className={cn(
                    "flex items-center gap-1 font-mono text-sm text-accent lowercase",
                    "lg:gap-4 lg:font-sans lg:text-md lg:font-bold lg:text-highlight",
                )}
            >
                {SITE_SECTIONS.map(children)}
            </UnorderedList>
        </nav>
    );
}

export { SiteNavigation };
export type { SiteNavigationProps };

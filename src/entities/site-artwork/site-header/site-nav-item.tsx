import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { SiteSection } from "../model";
import type { HTMLAttributes } from "react";


type SiteNavItemProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    section: SiteSection;
};

function SiteNavItem({
    section,
    className,
    ...props
}: SiteNavItemProps) {
    return (
        <span
            className={cn(
                "relative block whitespace-nowrap px-1.5 py-1 lg:px-2",
                className
            )}
            {...props}
        >
            <span aria-hidden="true" className="hidden lg:inline">[</span>
            <Text>{`_t(navigation.${section})`}</Text>
            <span aria-hidden="true" className="hidden lg:inline">]</span>
        </span>
    );
}

export { SiteNavItem };
export type { SiteNavItemProps };

import { cn } from "@shared/lib/utilities";
import { PlainText } from "@shared/ui-toolkit/typography";

import type { HTMLAttributes } from "react";


type SiteNavItemProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
    children: string;
};

function SiteNavItem({
    className,
    children,
    ...props
}: SiteNavItemProps) {
    return (
        <PlainText
            className={cn(
                "relative block whitespace-nowrap px-1.5 py-1 lg:px-2",
                className
            )}
            {...props}
        >
            <PlainText aria-hidden="true" className="hidden lg:inline">[</PlainText>
            <PlainText>{children}</PlainText>
            <PlainText aria-hidden="true" className="hidden lg:inline">]</PlainText>
        </PlainText>
    );
}

export { SiteNavItem };
export type { SiteNavItemProps };

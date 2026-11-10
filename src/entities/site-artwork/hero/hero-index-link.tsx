import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { HTMLAttributes } from "react";


type HeroIndexLinkProps = HTMLAttributes<HTMLSpanElement> & {
    isPrimary?: boolean;
};

function HeroIndexLink({
    isPrimary = false,
    className,
    children,
    ...props
}: HeroIndexLinkProps) {
    return (
        <Text
            className={cn("inline-block py-2", isPrimary ? "font-semibold text-accent" : "text-foreground", className)}
            {...props}
        >
            {children}
        </Text>
    );
}

export { HeroIndexLink };
export type { HeroIndexLinkProps };

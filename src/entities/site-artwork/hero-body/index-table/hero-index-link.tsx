import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { FC, HTMLAttributes } from "react";


type HeroIndexLinkProps = HTMLAttributes<HTMLSpanElement> & {
    isPrimary?: boolean;
};

const HeroIndexLink: FC<HeroIndexLinkProps> = ({
    isPrimary = false,
    className,
    children,
    ...props
}) => {
    return (
        <Text
            className={cn(
                "inline-block py-2",
                isPrimary
                    ? "font-semibold text-accent"
                    : "text-foreground",
                className
            )}
            {...props}
        >
            {children}
        </Text>
    );
};

HeroIndexLink.displayName = "HeroIndexLink";

export { HeroIndexLink };
export type { HeroIndexLinkProps };

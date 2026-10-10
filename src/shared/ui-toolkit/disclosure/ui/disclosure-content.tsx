import { Collapsible } from "radix-ui";

import { cn } from "@shared/lib/utilities";

import type { ComponentProps, FC } from "react";


type DisclosureContentProps = ComponentProps<typeof Collapsible.Content>;

const DisclosureContent: FC<DisclosureContentProps> = ({ className, ...props }) => {
    return (
        <Collapsible.Content
            className={cn("px-4 pb-4", className)}
            {...props}
        />
    );
};

DisclosureContent.displayName = "DisclosureContent";

export { DisclosureContent };
export type { DisclosureContentProps };

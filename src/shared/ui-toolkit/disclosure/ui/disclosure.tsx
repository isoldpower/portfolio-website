import { Collapsible } from "radix-ui";

import { cn } from "@shared/lib/utilities";

import { DisclosureContent } from "./disclosure-content.tsx";
import { DisclosureHeader } from "./disclosure-header.tsx";
import { DisclosureTrigger } from "./disclosure-trigger.tsx";

import type { DisclosureContentProps } from "./disclosure-content.tsx";
import type { DisclosureHeaderProps } from "./disclosure-header.tsx";
import type { DisclosureTriggerProps } from "./disclosure-trigger.tsx";
import type { ComponentProps, FC } from "react";


type DisclosureProps = ComponentProps<typeof Collapsible.Root>;

type DisclosureObject = FC<DisclosureProps> & {
    Header: FC<DisclosureHeaderProps>;
    Trigger: FC<DisclosureTriggerProps>;
    Content: FC<DisclosureContentProps>;
};

const Disclosure: DisclosureObject = ({ className, ...props }) => {
    return (
        <Collapsible.Root
            className={cn("min-w-0 rounded-xl border border-foreground/10", className)}
            {...props}
        />
    );
};

Disclosure.Header = DisclosureHeader;
Disclosure.Trigger = DisclosureTrigger;
Disclosure.Content = DisclosureContent;
Disclosure.displayName = "Disclosure";

export { Disclosure };
export type { DisclosureProps };

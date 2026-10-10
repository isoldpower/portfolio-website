import { Collapsible } from "radix-ui";

import { cn } from "@shared/lib/utilities";

import { DisclosureContent } from "./disclosure-content.tsx";
import { DisclosureTrigger } from "./disclosure-trigger.tsx";

import type { DisclosureContentProps } from "./disclosure-content.tsx";
import type { DisclosureTriggerProps } from "./disclosure-trigger.tsx";
import type { ComponentProps, FC } from "react";


type DisclosureProps = ComponentProps<typeof Collapsible.Root>;

type DisclosureObject = FC<DisclosureProps> & {
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

Disclosure.Trigger = DisclosureTrigger;
Disclosure.Content = DisclosureContent;
Disclosure.displayName = "Disclosure";

export { Disclosure };
export type { DisclosureProps };

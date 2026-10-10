import { Collapsible } from "radix-ui";

import { cn } from "@shared/lib/utilities";

import { ChevronRightIcon } from "../../icons";

import type { ComponentProps, FC } from "react";


type DisclosureTriggerProps = Omit<ComponentProps<typeof Collapsible.Trigger>, "asChild">;

const DisclosureTrigger: FC<DisclosureTriggerProps> = ({ className, children, ...props }) => {
    return (
        <Collapsible.Trigger
            className={cn(
                "group flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left",
                "rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                className
            )}
            {...props}
        >
            <span className="min-w-0 flex-1">{children}</span>
            <ChevronRightIcon
                size={16}
                className="shrink-0 text-subtle transition-transform duration-200 group-data-[state=open]:rotate-90"
            />
        </Collapsible.Trigger>
    );
};

DisclosureTrigger.displayName = "DisclosureTrigger";

export { DisclosureTrigger };
export type { DisclosureTriggerProps };

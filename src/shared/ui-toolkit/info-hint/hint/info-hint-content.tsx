import { Tooltip } from "radix-ui";

import { cn } from "@shared/lib/utilities";

import type { FC, PropsWithChildren } from "react";


type InfoHintContentProps = PropsWithChildren<{
    className?: string;
}>;

const InfoHintContent: FC<InfoHintContentProps> = ({ className, children }) => (
    <Tooltip.Portal>
        <Tooltip.Content
            side="top"
            align="end"
            sideOffset={6}
            collisionPadding={16}
            className={cn(
                "layer-overlay max-w-xs rounded-md border border-foreground/10 bg-background px-3 py-2",
                "text-xs leading-relaxed text-muted shadow-lg",
                className
            )}
        >
            {children}
            <Tooltip.Arrow className="fill-background" />
        </Tooltip.Content>
    </Tooltip.Portal>
);

InfoHintContent.displayName = "InfoHintContent";

export { InfoHintContent };
export type { InfoHintContentProps };

import { cn } from "@shared/lib/utilities";

import type { FinanceChannelPlacement } from "../model/types.ts";
import type { FC, ReactNode, Ref } from "react";


interface FinanceInfraTopicChannelProps {
    title: string;
    placement?: FinanceChannelPlacement;
    children: ReactNode;
    ref?: Ref<HTMLDivElement>;
}

const FinanceInfraTopicChannel: FC<FinanceInfraTopicChannelProps> = ({
    title,
    placement,
    children,
    ref
}) => {
    return (
        <div
            ref={ref}
            role="group"
            aria-label={`${title} channel`}
            style={placement === undefined ? undefined : { left: placement.x, top: placement.y }}
            className={cn(
                "absolute flex items-start gap-1 rounded-full border border-foreground/20 p-0.5",
                placement === undefined ? "invisible left-0 top-0" : "transition-[top,left] duration-200"
            )}
        >
            {children}
        </div>
    );
};

export { FinanceInfraTopicChannel };
export type { FinanceInfraTopicChannelProps };

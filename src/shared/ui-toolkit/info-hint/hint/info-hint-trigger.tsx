import { Tooltip } from "radix-ui";

import { cn } from "@shared/lib/utilities";

import { InfoIcon } from "../../icons";

import type { FC } from "react";


interface InfoHintTriggerProps {
    label: string;
    className?: string;
}

const InfoHintTrigger: FC<InfoHintTriggerProps> = ({ label, className }) => (
    <Tooltip.Trigger asChild>
        <button
            type="button"
            aria-label={label}
            className={cn(
                "shrink-0 cursor-help rounded-full p-1.5 text-subtle outline-none transition-colors",
                "hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40",
                className
            )}
        >
            <InfoIcon size={16} />
        </button>
    </Tooltip.Trigger>
);

InfoHintTrigger.displayName = "InfoHintTrigger";

export { InfoHintTrigger };
export type { InfoHintTriggerProps };

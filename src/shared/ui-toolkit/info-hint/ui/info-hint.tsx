import { Tooltip } from "radix-ui";

import { InfoIcon } from "../../icons";

import type { FC, ReactNode } from "react";


const OPEN_DELAY_MS = 150;

interface InfoHintProps {
    label: string;
    children: ReactNode;
}

const InfoHint: FC<InfoHintProps> = ({ label, children }) => (
    <Tooltip.Provider delayDuration={OPEN_DELAY_MS}>
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <button
                    type="button"
                    aria-label={label}
                    className="shrink-0 cursor-help rounded-full p-1.5 text-subtle outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                    <InfoIcon size={16} />
                </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    side="top"
                    align="end"
                    sideOffset={6}
                    collisionPadding={16}
                    className="z-50 max-w-xs rounded-md border border-foreground/10 bg-background px-3 py-2 text-xs leading-relaxed text-muted shadow-lg"
                >
                    {children}
                    <Tooltip.Arrow className="fill-background" />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    </Tooltip.Provider>
);

InfoHint.displayName = "InfoHint";

export { InfoHint };
export type { InfoHintProps };

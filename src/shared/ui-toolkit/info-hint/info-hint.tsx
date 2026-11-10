import { Tooltip } from "radix-ui";

import { InfoHintContent } from "./hint/info-hint-content.tsx";
import { InfoHintTrigger } from "./hint/info-hint-trigger.tsx";

import type { InfoHintContentProps } from "./hint/info-hint-content.tsx";
import type { InfoHintTriggerProps } from "./hint/info-hint-trigger.tsx";
import type { FC, PropsWithChildren } from "react";


const OPEN_DELAY_MS = 150;

type InfoHintProps = PropsWithChildren;

type InfoHintObject = FC<InfoHintProps> & {
    Trigger: FC<InfoHintTriggerProps>;
    Content: FC<InfoHintContentProps>;
};

const InfoHint: InfoHintObject = ({ children }) => (
    <Tooltip.Provider delayDuration={OPEN_DELAY_MS}>
        <Tooltip.Root>
            {children}
        </Tooltip.Root>
    </Tooltip.Provider>
);

InfoHint.Trigger = InfoHintTrigger;
InfoHint.Content = InfoHintContent;
InfoHint.displayName = "InfoHint";

export { InfoHint };
export type { InfoHintProps };

import { cn } from "@shared/lib/utilities";
import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface JourneyCheckpointLabelProps {
    isPending: boolean;
    children: ReactNode;
}

const JourneyCheckpointLabel: FC<JourneyCheckpointLabelProps> = ({ isPending, children }) => {
    return (
        <Text
            data-label
            size="2xs"
            className={cn(
                "absolute inset-x-0 bottom-0.5 text-center tracking-[1px] whitespace-nowrap",
                isPending && "opacity-60"
            )}
        >
            <PlainText data-caret className="opacity-0">&gt; </PlainText>
            {children}
        </Text>
    );
};

JourneyCheckpointLabel.displayName = "JourneyCheckpointLabel";

export { JourneyCheckpointLabel };
export type { JourneyCheckpointLabelProps };

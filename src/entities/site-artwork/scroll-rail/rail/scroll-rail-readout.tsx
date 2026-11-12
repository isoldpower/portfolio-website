import { Text } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface ScrollRailReadoutProps {
    value: string;
    isAccent?: boolean;
}

const ScrollRailReadout: FC<ScrollRailReadoutProps> = ({ value, isAccent = false }) => {
    return (
        <Text
            family="mono"
            size="2xs"
            tone={isAccent ? "accent" : "subtle"}
            className="leading-none tabular-nums [text-shadow:var(--text-shadow-soft)]"
        >
            {value}
        </Text>
    );
};

ScrollRailReadout.displayName = "ScrollRailReadout";

export { ScrollRailReadout };
export type { ScrollRailReadoutProps };

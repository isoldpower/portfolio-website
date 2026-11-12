import { cn } from "@shared/lib/utilities";
import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface PetCalloutLabelProps {
    title: string;
    hint: string;
    className?: string;
}

const PetCalloutLabel: FC<PetCalloutLabelProps> = ({ title, hint, className }) => {
    return (
        <PlainText className={cn("absolute top-[11%] left-[2%]", className)}>
            <Text
                family="mono"
                size="sm"
                weight="semibold"
                tone="accent"
                className="block leading-4 [text-shadow:var(--text-shadow-soft)]"
            >
                {title}
            </Text>
            <Text
                family="mono"
                size="xs"
                tone="subtle"
                className="absolute top-full left-0 mt-1 block whitespace-nowrap"
            >
                {hint}
            </Text>
        </PlainText>
    );
};

PetCalloutLabel.displayName = "PetCalloutLabel";

export { PetCalloutLabel };
export type { PetCalloutLabelProps };

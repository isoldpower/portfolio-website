import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface HeroIndexTypedValueProps {
    text: string;
    label: string;
    children: ReactNode;
}

const HeroIndexTypedValue: FC<HeroIndexTypedValueProps> = ({
    text,
    label,
    children
}) => {
    return (
        <Text
            role="text"
            aria-label={label}
            weight="semibold"
            tone="highlight"
            className="inline-flex items-center whitespace-pre"
        >
            <PlainText aria-hidden="true">"{text}</PlainText>
            {children}
            <PlainText aria-hidden="true">"</PlainText>
        </Text>
    );
};

HeroIndexTypedValue.displayName = "HeroIndexTypedValue";

export { HeroIndexTypedValue };
export type { HeroIndexTypedValueProps };

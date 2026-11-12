import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface SectionLabelTitleProps {
    text: string;
    typedLength: number;
    children?: ReactNode;
}

const SectionLabelTitle: FC<SectionLabelTitleProps> = ({ text, typedLength, children }) => {
    return (
        <Text
            as="h2"
            aria-label={text}
            size="sm"
            weight="semibold"
            tone="accent"
            className="absolute top-0 left-0 m-0 flex items-center leading-5 whitespace-pre md:text-lg"
        >
            <PlainText aria-hidden="true">
                {text.slice(0, typedLength)}
            </PlainText>
            {children}
            <PlainText aria-hidden="true" className="text-transparent">
                {text.slice(typedLength)}
            </PlainText>
        </Text>
    );
};

SectionLabelTitle.displayName = "SectionLabelTitle";

export { SectionLabelTitle };
export type { SectionLabelTitleProps };

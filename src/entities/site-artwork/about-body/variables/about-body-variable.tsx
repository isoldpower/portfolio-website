import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface AboutBodyVariableProps {
    type: string;
    name: string;
    value: string;
    children?: ReactNode;
}

const AboutBodyVariable: FC<AboutBodyVariableProps> = ({ type, name, value, children }) => {
    return (
        <PlainText className="flex flex-wrap gap-x-2 pl-[4ch] md:contents">
            <PlainText className="-ml-[4ch] flex whitespace-pre md:contents">
                <PlainText className="pr-2 opacity-70 md:pr-6">
                    {type}
                </PlainText>
                <Text tone="accent" className="pr-2 md:pr-6">
                    {name}
                </Text>
                <PlainText aria-hidden="true">=</PlainText>
            </PlainText>
            <PlainText className="min-w-0 wrap-break-word">
                "{value}"{children}
            </PlainText>
        </PlainText>
    );
};

AboutBodyVariable.displayName = "AboutBodyVariable";

export { AboutBodyVariable };
export type { AboutBodyVariableProps };

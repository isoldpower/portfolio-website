import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type BodyTextProps = Omit<TextProps, "family" | "weight" | "tracking" | "uppercase"> & {
    size?: Extract<TextProps["size"], "sm" | "base" | "lg">;
};

function BodyText({
    as = "p",
    size = "base",
    tone = "muted",
    leading = "relaxed",
    ...props
}: BodyTextProps) {
    return <Text as={as} size={size} tone={tone} leading={leading} {...props} />;
}

export { BodyText };
export type { BodyTextProps };

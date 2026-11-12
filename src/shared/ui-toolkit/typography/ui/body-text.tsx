import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type BodyTextProps = Omit<TextProps, "family" | "weight" | "tracking" | "uppercase"> & {
    size?: Extract<TextProps["size"], "sm" | "base" | "lg">;
};

function BodyText({
    as = "p",
    size = "base",
    tone = "default",
    ...props
}: BodyTextProps) {
    return <Text as={as} family="mono" size={size} tone={tone} {...props} />;
}

export { BodyText };
export type { BodyTextProps };

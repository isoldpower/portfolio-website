import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type CaptionProps = Omit<TextProps, "family" | "weight" | "tracking" | "uppercase"> & {
    size?: Extract<TextProps["size"], "xs" | "sm">;
};

function Caption({
    as = "p",
    size = "xs",
    tone = "default",
    ...props
}: CaptionProps) {
    return <Text as={as} family="mono" size={size} tone={tone} {...props} />;
}

export { Caption };
export type { CaptionProps };

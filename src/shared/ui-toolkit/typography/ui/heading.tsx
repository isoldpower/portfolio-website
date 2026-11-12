import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type HeadingProps = Omit<TextProps, "family" | "weight" | "tracking" | "uppercase"> & {
    size?: Extract<TextProps["size"], "lg" | "xl" | "2xl">;
};

function Heading({
    as = "h2",
    size = "xl",
    tone = "accent",
    ...props
}: HeadingProps) {
    return (
        <Text
            as={as}
            size={size}
            weight="bold"
            tone={tone}
            {...props}
        />
    );
}

export { Heading };
export type { HeadingProps };

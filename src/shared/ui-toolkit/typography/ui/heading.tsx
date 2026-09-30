import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type HeadingProps = Omit<TextProps, "family" | "weight" | "tracking" | "uppercase"> & {
    size?: Extract<TextProps["size"], "lg" | "xl" | "2xl">;
};

function Heading({
    as = "h2",
    size = "2xl",
    ...props
}: HeadingProps) {
    return (
        <Text
            as={as}
            family="display"
            size={size}
            weight="semibold"
            tracking="tight"
            {...props}
        />
    );
}

export { Heading };
export type { HeadingProps };

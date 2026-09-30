import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type OverlineProps = Omit<TextProps, "family" | "uppercase"> & {
    size?: Extract<TextProps["size"], "xs" | "sm">;
};

function Overline({
    as = "div",
    size = "xs",
    tone = "subtle",
    tracking = "widest",
    ...props
}: OverlineProps) {
    return (
        <Text
            as={as}
            family="mono"
            size={size}
            tone={tone}
            tracking={tracking}
            uppercase
            {...props}
        />
    );
}

export { Overline };
export type { OverlineProps };

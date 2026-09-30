import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type DisplayTextProps = Omit<TextProps, "family" | "weight" | "uppercase"> & {
    size?: Extract<TextProps["size"], "3xl" | "4xl" | "5xl">;
};

function DisplayText({
    as = "p",
    size = "5xl",
    tracking = "tight",
    leading = "tight",
    ...props
}: DisplayTextProps) {
    return (
        <Text
            as={as}
            family="display"
            size={size}
            weight="bold"
            tracking={tracking}
            leading={leading}
            {...props}
        />
    );
}

export { DisplayText };
export type { DisplayTextProps };

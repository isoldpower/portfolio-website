import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type MetaTextProps = Omit<TextProps, "family" | "uppercase"> & {
    size?: Extract<TextProps["size"], "xs" | "sm" | "base">;
};

function MetaText({
    as,
    dateTime,
    size = "xs",
    weight = "medium",
    tone = "default",
    leading = "tight",
    ...props
}: MetaTextProps) {
    return (
        <Text
            as={as ?? (dateTime ? "time" : "span")}
            size={size}
            weight={weight}
            tone={tone}
            leading={leading}
            dateTime={dateTime}
            {...props}
        />
    );
}

export { MetaText };
export type { MetaTextProps };

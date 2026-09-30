import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type MetaTextProps = Omit<TextProps, "family" | "uppercase"> & {
    size?: Extract<TextProps["size"], "xs" | "sm">;
};

function MetaText({
    as,
    dateTime,
    size = "xs",
    tone = "subtle",
    leading = "tight",
    ...props
}: MetaTextProps) {
    return (
        <Text
            as={as ?? (dateTime ? "time" : "span")}
            family="mono"
            size={size}
            tone={tone}
            leading={leading}
            dateTime={dateTime}
            {...props}
        />
    );
}

export { MetaText };
export type { MetaTextProps };

import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type InlineCodeProps = Omit<TextProps, "as" | "family" | "uppercase"> & {
    size?: Extract<TextProps["size"], "xs" | "sm" | "base">;
};

function InlineCode({
    size = "sm",
    ...props
}: InlineCodeProps) {
    return <Text as="code" family="mono" size={size} {...props} />;
}

export { InlineCode };
export type { InlineCodeProps };

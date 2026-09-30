import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type ErrorTextProps = Omit<TextProps, "size" | "family" | "weight" | "tone" | "tracking" | "uppercase">;

function ErrorText({
    as = "p",
    role = "alert",
    ...props
}: ErrorTextProps) {
    return <Text as={as} size="sm" tone="negative" role={role} {...props} />;
}

export { ErrorText };
export type { ErrorTextProps };

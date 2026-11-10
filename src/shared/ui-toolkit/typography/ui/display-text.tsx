import { cn } from "@shared/lib/utilities";

import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type DisplayTextProps = Omit<TextProps, "family" | "weight" | "uppercase"> & {
    size?: Extract<TextProps["size"], "3xl" | "4xl" | "5xl" | "hero">;
};

function DisplayText({
    as = "p",
    size = "hero",
    tone = "accent",
    className,
    ...props
}: DisplayTextProps) {
    return (
        <Text
            as={as}
            family="display"
            size={size}
            weight="extrabold"
            tone={tone}
            className={cn("text-shadow-hero", className)}
            {...props}
        />
    );
}

export { DisplayText };
export type { DisplayTextProps };

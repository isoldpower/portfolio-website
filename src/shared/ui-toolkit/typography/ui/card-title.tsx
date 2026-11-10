import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type CardTitleProps = Omit<TextProps, "size" | "family" | "weight" | "tracking" | "uppercase">;

function CardTitle({
    as = "h3",
    tone = "accent",
    ...props
}: CardTitleProps) {
    return <Text as={as} size="xl" weight="bold" tone={tone} {...props} />;
}

export { CardTitle };
export type { CardTitleProps };

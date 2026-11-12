import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type PageTitleProps = Omit<TextProps, "size" | "family" | "weight" | "tracking" | "uppercase">;

function PageTitle({
    as = "h1",
    tone = "accent",
    ...props
}: PageTitleProps) {
    return (
        <Text
            as={as}
            size="3xl"
            weight="extrabold"
            tone={tone}
            {...props}
        />
    );
}

export { PageTitle };
export type { PageTitleProps };

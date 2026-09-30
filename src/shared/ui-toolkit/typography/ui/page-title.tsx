import { Text } from "./text.tsx";

import type { TextProps } from "./text.tsx";


type PageTitleProps = Omit<TextProps, "size" | "family" | "weight" | "tracking" | "uppercase">;

function PageTitle({
    as = "h1",
    ...props
}: PageTitleProps) {
    return (
        <Text
            as={as}
            family="display"
            size="4xl"
            weight="semibold"
            tracking="tight"
            {...props}
        />
    );
}

export { PageTitle };
export type { PageTitleProps };

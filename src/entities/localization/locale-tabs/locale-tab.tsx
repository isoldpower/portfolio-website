import { Text } from "@shared/ui-toolkit/typography";

import type { ButtonHTMLAttributes } from "react";


type LocaleTabProps = ButtonHTMLAttributes<HTMLButtonElement>;

function LocaleTab({
    children,
    ...props
}: LocaleTabProps) {
    return (
        <Text {...props}>
            {children}
        </Text>
    );
}

export { LocaleTab };
export type { LocaleTabProps };

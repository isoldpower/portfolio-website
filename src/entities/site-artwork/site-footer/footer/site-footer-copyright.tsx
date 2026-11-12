import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface SiteFooterCopyrightProps {
    children: ReactNode;
}

const SiteFooterCopyright: FC<SiteFooterCopyrightProps> = ({ children }) => {
    return (
        <Text as="p" family="mono" size="xs" tone="strong" className="m-0 flex items-center">
            {children}
        </Text>
    );
};

SiteFooterCopyright.displayName = "SiteFooterCopyright";

export { SiteFooterCopyright };
export type { SiteFooterCopyrightProps };

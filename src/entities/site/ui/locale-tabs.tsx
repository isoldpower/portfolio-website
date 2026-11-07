import { SUPPORTED_LOCALES } from "@shared/lib/i18n";
import { cn } from "@shared/lib/utilities";

import type { Locale } from "@shared/lib/i18n";
import type { HTMLAttributes, ReactNode } from "react";


type LocaleTabsProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    children: (locale: Locale) => ReactNode;
};

function LocaleTabs({
    className,
    children,
    ...props
}: LocaleTabsProps) {
    return (
        <div
            role="group"
            className={cn("flex items-center gap-3", className)}
            {...props}
        >
            {SUPPORTED_LOCALES.map((locale) => children(locale))}
        </div>
    );
}

export { LocaleTabs };
export type { LocaleTabsProps };

import { Fragment } from "react";

import { SUPPORTED_LOCALES } from "@shared/lib/i18n";
import { cn } from "@shared/lib/utilities";
import { PlainText } from "@shared/ui-toolkit/typography";

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
            className={cn(
                "flex shrink-0 items-center font-mono text-sm text-accent lowercase",
                "lg:font-sans lg:text-md lg:font-bold lg:text-highlight lg:text-shadow-nav",
                className
            )}
            {...props}
        >
            {SUPPORTED_LOCALES.map((locale, index) => (
                <Fragment key={locale}>
                    {index > 0 ? <PlainText aria-hidden="true">/</PlainText> : null}
                    {children(locale)}
                </Fragment>
            ))}
        </div>
    );
}

export { LocaleTabs };
export type { LocaleTabsProps };

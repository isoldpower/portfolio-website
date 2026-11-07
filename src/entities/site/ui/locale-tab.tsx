import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import { resolveLocaleNativeName } from "../visual-map";

import type { Locale } from "@shared/lib/i18n";
import type { ButtonHTMLAttributes } from "react";


type LocaleTabProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    locale: Locale;
    isActive: boolean;
};

function LocaleTab({
    locale,
    isActive,
    className,
    ...props
}: LocaleTabProps) {
    return (
        <button
            type="button"
            lang={locale}
            aria-pressed={isActive}
            title={resolveLocaleNativeName(locale)}
            className={cn(
                "cursor-pointer border-b-2 pb-0.5 transition-colors outline-none",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                    ? "border-accent cursor-default"
                    : "border-transparent hover:border-foreground/25",
                className
            )}
            {...props}
        >
            <Text
                family="mono"
                size="xs"
                tracking="widest"
                uppercase
                tone={isActive ? "strong" : "subtle"}
            >
                {locale}
            </Text>
        </button>
    );
}

export { LocaleTab };
export type { LocaleTabProps };

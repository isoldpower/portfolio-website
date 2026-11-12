import { cn } from "@shared/lib/utilities";
import { useActiveLocale } from "./use-active-locale.ts";

import {type ButtonHTMLAttributes, type FC, useCallback, useMemo} from "react";
import type { Locale } from "@shared/lib/i18n";
import {useChangeLocale} from "@features/localization/locale-switch/use-change-locale.ts";


interface LocaleOnClickProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type' | 'aria-pressed' | 'lang'
> {
    locale: Locale
}

const LocaleOnClick: FC<LocaleOnClickProps> = ({
    locale,
    className,
    ...props
}) => {
    const activeLocale = useActiveLocale();
    const changeLocale = useChangeLocale();
    const isActive = useMemo(() => {
        return activeLocale === locale;
    }, [activeLocale, locale]);

    const handleLocaleSelect = useCallback(() => {
        void changeLocale(locale);
    }, []);

    return (
        <button
            type="button"
            lang={locale}
            aria-pressed={isActive}
            onClick={handleLocaleSelect}
            className={cn(
                "underline-offset-4 decoration-from-font",
                isActive && "font-bold underline",
                className
            )}
            {...props}
        >

        </button>
    );
}

export { LocaleOnClick };
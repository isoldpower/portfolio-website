import { Link } from "@tanstack/react-router";

import { LocaleTab, LocaleTabs, SiteHeaderShell } from "@entities/site";
import { useActiveLocale, useChangeLocale } from "@features/accessibility/locale-switch";
import { Text } from "@shared/ui-toolkit/typography";


function SiteHeader() {
    const activeLocale = useActiveLocale();
    const changeLocale = useChangeLocale();

    return (
        <SiteHeaderShell>
            <Link to="/" className="outline-none focus-visible:outline-2 focus-visible:outline-accent">
                <Text family="display" weight="semibold" tone="strong">
                    _t(meta.title)
                </Text>
            </Link>
            <LocaleTabs aria-label="Language">
                {(locale) => (
                    <LocaleTab
                        key={locale}
                        locale={locale}
                        isActive={locale === activeLocale}
                        onClick={() => { void changeLocale(locale); }}
                    />
                )}
            </LocaleTabs>
        </SiteHeaderShell>
    );
}

export { SiteHeader };

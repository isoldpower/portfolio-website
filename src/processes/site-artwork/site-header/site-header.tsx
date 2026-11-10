import { LocaleTabs } from "@entities/localization/locale-tabs";
import { SiteHeaderShell, SiteNavigation } from "@entities/site-artwork/site-header";
import { HeaderLocaleLink, HeaderSectionNavigation } from "@widgets/site-artwork/site-header";


function SiteHeader() {
    return (
        <SiteHeaderShell>
            <LocaleTabs aria-label="Language">
                {(locale) => (
                    <HeaderLocaleLink key={locale} locale={locale} />
                )}
            </LocaleTabs>
            <SiteNavigation aria-label="Sections">
                {(section) => (
                    <HeaderSectionNavigation key={section} section={section} />
                )}
            </SiteNavigation>
        </SiteHeaderShell>
    );
}

export { SiteHeader };

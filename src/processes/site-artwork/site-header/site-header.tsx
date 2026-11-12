import { LocaleTabs } from "@entities/localization/locale-tabs";
import { SiteHeaderGroup, SiteHeaderShell, SiteNavigation } from "@entities/site-artwork/site-header";
import { HeaderHomeLink, HeaderLocaleLink, HeaderSectionNavigation } from "@widgets/site-artwork/site-header";


function SiteHeader() {
    return (
        <SiteHeaderShell>
            <SiteHeaderGroup>
                <HeaderHomeLink />
                <LocaleTabs aria-label="Language">
                    {(locale) => (
                        <HeaderLocaleLink key={locale} locale={locale} />
                    )}
                </LocaleTabs>
            </SiteHeaderGroup>
            <SiteNavigation aria-label="Sections">
                {(section) => (
                    <HeaderSectionNavigation key={section} section={section} />
                )}
            </SiteNavigation>
        </SiteHeaderShell>
    );
}

export { SiteHeader };

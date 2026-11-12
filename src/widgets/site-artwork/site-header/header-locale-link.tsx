import { LocaleTab } from "@entities/localization/locale-tabs";
import { resolveLocaleNativeName } from "@entities/localization/visual-map";
import { LocaleOnClick } from "@features/localization/locale-switch";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { ToggleHover } from "@features/site-artwork/toggle-hover";
import { AnimationComposer } from "@shared/lib/components";

import type {Locale} from "@shared/lib/i18n";


interface HeaderLocaleLinkProps {
    locale: Locale;
}

function HeaderLocaleLink({
    locale
}: HeaderLocaleLinkProps) {
    return (
        <AnimationComposer>
            <ToggleHover />
            <FocusOutline />
            <LocaleOnClick title={resolveLocaleNativeName(locale)} locale={locale}>
                <LocaleTab>
                    {locale}
                </LocaleTab>
            </LocaleOnClick>
        </AnimationComposer>
    );
}

export { HeaderLocaleLink };

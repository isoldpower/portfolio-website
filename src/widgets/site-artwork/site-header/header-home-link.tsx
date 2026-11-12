import { useTranslation } from "react-i18next";

import { SiteHomeMark } from "@entities/site-artwork/site-header";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { NavigateToHome } from "@features/site-artwork/section-navigation";
import { AnimationComposer } from "@shared/lib/components";


function HeaderHomeLink() {
    const { t } = useTranslation();

    return (
        <AnimationComposer>
            <FocusOutline />
            <NavigateToHome label={t("navigation.home")} className="block">
                <SiteHomeMark />
            </NavigateToHome>
        </AnimationComposer>
    );
}

export { HeaderHomeLink };

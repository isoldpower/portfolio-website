import { useTranslation } from "react-i18next";

import { SiteFooter as SiteFooterBody } from "@entities/site-artwork/site-footer";
import { CursorBlink } from "@features/site-artwork/cursor-blink";
import { AnimationComposer } from "@shared/lib/components";


function SiteFooter() {
    const { t } = useTranslation();

    return (
        <SiteFooterBody>
            <SiteFooterBody.Copyright>
                {t("footer.copyright", { year: new Date().getFullYear() })}
                <AnimationComposer>
                    <CursorBlink />
                    <SiteFooterBody.Cursor />
                </AnimationComposer>
            </SiteFooterBody.Copyright>
        </SiteFooterBody>
    );
}

export { SiteFooter };

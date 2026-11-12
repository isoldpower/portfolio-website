import { SiteNavItem } from "@entities/site-artwork/site-header";
import { InsetFocusOutline } from "@features/site-artwork/focus-outline";
import { NavigationHover } from "@features/site-artwork/navigation-hover";
import { NavigateToSection } from "@features/site-artwork/section-navigation";
import { AnimationComposer } from "@shared/lib/components";

import type { SiteSection } from "@entities/site-artwork/model";


interface HeaderSectionNavigationProps {
    section: SiteSection;
}

function HeaderSectionNavigation({
    section
}: HeaderSectionNavigationProps) {
    return (
        <AnimationComposer>
            <InsetFocusOutline />
            <NavigateToSection section={section} className="block">
                <AnimationComposer>
                    <NavigationHover />
                    <SiteNavItem>
                        {`_t(navigation.${section})`}
                    </SiteNavItem>
                </AnimationComposer>
            </NavigateToSection>
        </AnimationComposer>
    );
}

export { HeaderSectionNavigation };

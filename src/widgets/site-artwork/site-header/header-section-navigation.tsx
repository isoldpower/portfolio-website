import { SiteNavItem } from "@entities/site-artwork/site-header";
import { InsetFocusOutline } from "@features/site-artwork/focus-outline";
import { NavigateToSection } from "@features/site-artwork/section-navigation";
import { NavigationHover } from "@features/site-artwork/navigation-hover";
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
                    <SiteNavItem section={section} />
                </AnimationComposer>
            </NavigateToSection>
        </AnimationComposer>
    );
}

export { HeaderSectionNavigation };

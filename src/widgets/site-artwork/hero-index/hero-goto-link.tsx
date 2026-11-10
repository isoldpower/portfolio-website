import { HeroIndexLink } from "@entities/site-artwork/hero";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { LinkHover } from "@features/site-artwork/link-hover";
import { NavigateToSection } from "@features/site-artwork/section-navigation";
import { AnimationComposer } from "@shared/lib/components";

import type { SiteSection } from "@entities/site-artwork/model";


interface HeroGotoLinkProps {
    section: SiteSection;
    label: string;
    isPrimary?: boolean;
}

function HeroGotoLink({
    section,
    label,
    isPrimary
}: HeroGotoLinkProps) {
    return (
        <AnimationComposer>
            <FocusOutline />
            <NavigateToSection section={section} className="mr-4">
                <AnimationComposer>
                    <LinkHover />
                    <HeroIndexLink isPrimary={isPrimary}>{label}</HeroIndexLink>
                </AnimationComposer>
            </NavigateToSection>
        </AnimationComposer>
    );
}

export { HeroGotoLink };
export type { HeroGotoLinkProps };

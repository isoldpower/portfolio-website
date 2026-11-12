import { HeroIndexTable } from "@entities/site-artwork/hero-body";
import { CursorBlink } from "@features/site-artwork/cursor-blink";
import { useHeroRoles, useTypewriter } from "@features/site-artwork/hero-typewriter";
import { AnimationComposer } from "@shared/lib/components";

import { HeroGotoLink } from "./hero-goto-link.tsx";


interface HeroIndexProps {
    className?: string;
}

function HeroIndex({ className }: HeroIndexProps) {
    const roles = useHeroRoles();
    const { text, activeIndex } = useTypewriter({ words: roles });

    return (
        <HeroIndexTable className={className}>
            <HeroIndexTable.Row index={0}>
                <HeroIndexTable.Assignment name="role">
                    <HeroIndexTable.TypedValue label={roles.join(", ")} text={text}>
                        <AnimationComposer>
                            <CursorBlink />
                            <HeroIndexTable.TypingCursor />
                        </AnimationComposer>
                    </HeroIndexTable.TypedValue>
                </HeroIndexTable.Assignment>
            </HeroIndexTable.Row>
            <HeroIndexTable.Row index={1}>
                <HeroIndexTable.Assignment name="modes">
                    <HeroIndexTable.ModeList>
                        {(role, index) => (
                            <HeroIndexTable.ModeOption key={role} isActive={index === activeIndex}>
                                {role}
                            </HeroIndexTable.ModeOption>
                        )}
                    </HeroIndexTable.ModeList>
                </HeroIndexTable.Assignment>
            </HeroIndexTable.Row>
            <HeroIndexTable.Row index={2}>
                <HeroIndexTable.Assignment name="goto">
                    <HeroGotoLink section="portfolio" label="_t(hero.view_projects)" isPrimary />
                    <HeroGotoLink section="contacts" label="_t(hero.get_in_touch)" />
                </HeroIndexTable.Assignment>
            </HeroIndexTable.Row>
            <HeroIndexTable.Row index={3}>
                <HeroIndexTable.Comment />
            </HeroIndexTable.Row>
        </HeroIndexTable>
    );
}

export { HeroIndex };
export type { HeroIndexProps };

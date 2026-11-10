import {
    HeroIndexAssignment,
    HeroIndexComment,
    HeroIndexRow,
    HeroIndexTable,
    HeroModeList,
    HeroModeOption,
    HeroTypedValue,
    HeroTypingCursor
} from "@entities/site-artwork/hero";
import { CursorBlink } from "@features/site-artwork/cursor-blink";
import { useHeroRoles, useTypewriter } from "@features/site-artwork/hero-typewriter";
import { AnimationComposer } from "@shared/lib/components";

import { HeroGotoLink } from "./hero-goto-link.tsx";


function HeroIndex() {
    const roles = useHeroRoles();
    const { text, activeIndex } = useTypewriter({ words: roles });

    return (
        <HeroIndexTable>
            <HeroIndexRow index={0}>
                <HeroIndexAssignment name="role">
                    <HeroTypedValue
                        text={text}
                        label={roles.join(", ")}
                        cursor={(
                            <AnimationComposer>
                                <CursorBlink />
                                <HeroTypingCursor />
                            </AnimationComposer>
                        )}
                    />
                </HeroIndexAssignment>
            </HeroIndexRow>
            <HeroIndexRow index={1}>
                <HeroIndexAssignment name="modes">
                    <HeroModeList>
                        {(role, index) => (
                            <HeroModeOption key={role} isActive={index === activeIndex}>
                                {role}
                            </HeroModeOption>
                        )}
                    </HeroModeList>
                </HeroIndexAssignment>
            </HeroIndexRow>
            <HeroIndexRow index={2}>
                <HeroIndexAssignment name="goto">
                    <HeroGotoLink section="portfolio" label="_t(hero.view_projects)" isPrimary />
                    <HeroGotoLink section="contacts" label="_t(hero.get_in_touch)" />
                </HeroIndexAssignment>
            </HeroIndexRow>
            <HeroIndexRow index={3}>
                <HeroIndexComment />
            </HeroIndexRow>
        </HeroIndexTable>
    );
}

export { HeroIndex };

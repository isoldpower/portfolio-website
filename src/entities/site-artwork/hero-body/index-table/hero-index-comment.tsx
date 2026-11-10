import { Text } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


type HeroIndexCommentProps = Record<string, never>;

const HeroIndexComment: FC<HeroIndexCommentProps> = () => {
    return (
        <>
            <Text className="mr-2 text-accent">_t(hero.note_label)</Text>
            <Text>_t(hero.note)</Text>
        </>
    );
};

HeroIndexComment.displayName = "HeroIndexComment";

export { HeroIndexComment };
export type { HeroIndexCommentProps };

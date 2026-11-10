import { Text } from "@shared/ui-toolkit/typography";


function HeroIndexComment() {
    return (
        <>
            <Text className="mr-2 text-accent">_t(hero.note_label)</Text>
            <Text>_t(hero.note)</Text>
        </>
    );
}

export { HeroIndexComment };

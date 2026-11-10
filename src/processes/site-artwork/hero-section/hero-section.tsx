import { HeroArtworkColumn, HeroKicker, HeroSectionShell, HeroTextColumn, HeroTitle } from "@entities/site-artwork/hero";
import { HeroIndex } from "@widgets/site-artwork/hero-index";
import { RabbitScene } from "@widgets/site-artwork/rabbit-scene";


function HeroSection() {
    return (
        <HeroSectionShell>
            <HeroArtworkColumn>
                <RabbitScene />
            </HeroArtworkColumn>
            <HeroTextColumn>
                <HeroKicker />
                <HeroTitle />
                <HeroIndex />
            </HeroTextColumn>
        </HeroSectionShell>
    );
}

export { HeroSection };

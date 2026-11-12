import { HeroBody } from "@entities/site-artwork/hero-body";
import { HeroTitle } from "@entities/site-artwork/hero-title";
import { PetCallout } from "@entities/site-artwork/pet-callout";
import { CalloutBob } from "@features/site-artwork/callout-bob";
import { IntroHandoff, IntroReveal, useIntroTarget } from "@features/site-artwork/intro-loader";
import { ScrollSink } from "@features/site-artwork/scroll-reveal";
import { AnimationComposer } from "@shared/lib/components";
import { HeroIndex } from "@widgets/site-artwork/hero-index";
import { RabbitScene } from "@widgets/site-artwork/rabbit-scene";


function HeroSection() {
    const titleTarget = useIntroTarget("title");

    return (
        <HeroBody>
            <AnimationComposer>
                <ScrollSink />
                <HeroBody.ArtworkColumn>
                    <RabbitScene />
                    <AnimationComposer>
                        <IntroReveal order={3} />
                        <PetCallout>
                            <AnimationComposer>
                                <CalloutBob />
                                <PetCallout.Label title="_t(hero.pet_title)" hint="_t(hero.pet_hint)" />
                            </AnimationComposer>
                            <PetCallout.Leader />
                        </PetCallout>
                    </AnimationComposer>
                </HeroBody.ArtworkColumn>
            </AnimationComposer>
            <HeroBody.TextColumn>
                <HeroTitle>
                    <AnimationComposer>
                        <IntroReveal order={1} />
                        <HeroTitle.Kicker />
                    </AnimationComposer>
                    <AnimationComposer>
                        <IntroHandoff />
                        <HeroTitle.Name ref={titleTarget} />
                    </AnimationComposer>
                </HeroTitle>
                <AnimationComposer>
                    <IntroReveal order={2} />
                    <HeroIndex />
                </AnimationComposer>
            </HeroBody.TextColumn>
        </HeroBody>
    );
}

export { HeroSection };

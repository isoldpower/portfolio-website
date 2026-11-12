import { HeroBody } from "@entities/site-artwork/hero-body";
import { HeroTitle } from "@entities/site-artwork/hero-title";
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

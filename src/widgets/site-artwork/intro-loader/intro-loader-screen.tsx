import { IntroNameLine, IntroProgress, IntroRabbitSnapshot, IntroScreen } from "@entities/site-artwork/intro-loader";
import { CursorBlink } from "@features/site-artwork/cursor-blink";
import {
    GlossFold,
    IntroSceneSnapshot,
    IntroSceneStep,
    ProgressFade,
    SnapshotScan,
    useIntroScene,
    useSceneView
} from "@features/site-artwork/intro-loader";
import { AnimationComposer } from "@shared/lib/components";


function IntroLoaderScreen() {
    const { refs, names } = useIntroScene();
    const view = useSceneView();

    return (
        <IntroScreen ref={refs.screen} isInteractive={view.step !== "fly"} aria-busy={view.step === "load"}>
            <IntroNameLine aria-label={view.typed ? `${names.firstName} ${names.lastName}` : names.lastName}>
                <IntroNameLine.Word ref={refs.firstWord}>{view.typed}</IntroNameLine.Word>
                <IntroSceneStep step="type">
                    <AnimationComposer>
                        <CursorBlink />
                        <IntroNameLine.TypingCursor />
                    </AnimationComposer>
                </IntroSceneStep>
                <IntroNameLine.Word ref={refs.lastWord}>{names.lastName}</IntroNameLine.Word>
                <AnimationComposer>
                    <GlossFold />
                    <IntroNameLine.Gloss labelRef={refs.gloss} slotWidth={view.glossWidth}>
                        {view.gloss}
                    </IntroNameLine.Gloss>
                </AnimationComposer>
                <AnimationComposer>
                    <ProgressFade />
                    <IntroProgress progress={view.progress} isVisible={view.step === "load"}>
                        <IntroProgress.Bar progress={view.progress} />
                        <IntroProgress.Percent progress={view.progress} />
                        <IntroProgress.Stage stage={view.stage} />
                    </IntroProgress>
                </AnimationComposer>
            </IntroNameLine>
            <IntroSceneSnapshot>
                {(snapshot) => (
                    <IntroRabbitSnapshot width={snapshot.width} height={snapshot.height}>
                        <AnimationComposer>
                            <SnapshotScan />
                            <IntroRabbitSnapshot.Image
                                ref={refs.snapshot}
                                src={snapshot.src}
                                width={snapshot.width}
                                height={snapshot.height}
                                filter={snapshot.filter}
                                isRevealed={view.isSnapshotRevealed}
                            />
                        </AnimationComposer>
                    </IntroRabbitSnapshot>
                )}
            </IntroSceneSnapshot>
            <IntroSceneStep step="fly">
                <IntroScreen.ParticleCanvas ref={refs.particles} />
            </IntroSceneStep>
        </IntroScreen>
    );
}

export { IntroLoaderScreen };

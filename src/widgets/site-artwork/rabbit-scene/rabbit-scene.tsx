import { Suspense, useRef } from "react";

import { AsciiCanvas, AsciiRabbitFrame, RabbitMesh, RabbitRenderStage } from "@entities/site-artwork/ascii-rabbit";
import { useAsciiAppear } from "@features/site-artwork/ascii-appear";
import { AsciiRasterizer } from "@features/site-artwork/ascii-rasterizer";
import { IntroHandoff, useIntroSnapshot, useRabbitReporter } from "@features/site-artwork/intro-loader";
import { EarSway, useEarSwayMaterial } from "@features/site-artwork/rabbit-ear-sway";
import { RabbitModel } from "@features/site-artwork/rabbit-model";
import { AnimationComposer } from "@shared/lib/components";

import { CELL_SIZE, EAR_SWAY_DEGREES, GLYPHS } from "./config.ts";


function RabbitScene() {
    const asciiCanvas = useRef<HTMLCanvasElement>(null);
    const material = useEarSwayMaterial();
    const reporter = useRabbitReporter();
    const { phase: introPhase } = useIntroSnapshot();
    const asciiAppear = useAsciiAppear({
        canvas: asciiCanvas,
        cell: CELL_SIZE,
        glyphs: GLYPHS,
        isIntroDone: introPhase === "done",
        onDraw: reporter.markReady,
    });

    return (
        <AnimationComposer>
            <IntroHandoff />
            <AsciiRabbitFrame aria-label="Rabbit drawn in glowing + $ @ characters">
                <AsciiCanvas ref={asciiCanvas} />
                <RabbitRenderStage>
                    <Suspense fallback={null}>
                        <RabbitModel material={material} onProgress={reporter.reportProgress}>
                            {(model) => (
                                <RabbitMesh model={model} />
                            )}
                        </RabbitModel>
                    </Suspense>
                    <EarSway
                        material={material}
                        amountDegrees={EAR_SWAY_DEGREES}
                    />
                    <AsciiRasterizer
                        canvas={asciiCanvas}
                        cell={CELL_SIZE}
                        glyphs={GLYPHS}
                        onDraw={asciiAppear.handleDraw}
                        arrange={asciiAppear.arrange}
                    />
                </RabbitRenderStage>
            </AsciiRabbitFrame>
        </AnimationComposer>
    );
}

export { RabbitScene };

import { useSceneSelector } from "./use-scene-selector.ts";

import type { SequenceStep } from "../types.ts";
import type { FC, ReactNode } from "react";


interface IntroSceneStepProps {
    step: SequenceStep;
    children: ReactNode;
}

const IntroSceneStep: FC<IntroSceneStepProps> = ({ step, children }) => {
    const isActive = useSceneSelector((view) => {
        return view.step === step;
    });

    return isActive ? children : null;
};

IntroSceneStep.displayName = "IntroSceneStep";

export { IntroSceneStep };
export type { IntroSceneStepProps };

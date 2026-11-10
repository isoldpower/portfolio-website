import { useMemo } from "react";

import { useLoadStep } from "./load/use-load-step.ts";
import { useMorphStep } from "./morph/use-morph-step.ts";
import { useFlightStep } from "./particles/use-flight-step.ts";
import { useSkipStep } from "./skip/use-skip-step.ts";
import { useTypingStep } from "./typing/use-typing-step.ts";

import type { SceneStep } from "../types.ts";


type UseIntroAnimationStepsReturn = readonly SceneStep[];

const useIntroAnimationSteps = (): UseIntroAnimationStepsReturn => {
    const load = useLoadStep();
    const skip = useSkipStep();
    const typing = useTypingStep();
    const morph = useMorphStep();
    const flight = useFlightStep();

    return useMemo(() => {
        return [load, skip, typing, morph, flight];
    }, [load, skip, typing, morph, flight]);
};

export { useIntroAnimationSteps };
export type { UseIntroAnimationStepsReturn };

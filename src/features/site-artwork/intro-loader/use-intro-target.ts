import { useCallback } from "react";

import { useIntroStage } from "./stage/use-intro-stage.ts";

import type { IntroTargetRole } from "./types.ts";
import type { RefCallback } from "react";


type UseIntroTargetReturn = RefCallback<HTMLElement>;

const useIntroTarget = (role: IntroTargetRole): UseIntroTargetReturn => {
    const stage = useIntroStage();

    return useCallback((element: HTMLElement | null) => {
        stage?.registerTarget(role, element);

        return () => {
            stage?.registerTarget(role, null);
        };
    }, [stage, role]);
};

export { useIntroTarget };
export type { UseIntroTargetReturn };

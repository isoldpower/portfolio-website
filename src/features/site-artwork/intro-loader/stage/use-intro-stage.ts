import { useContext } from "react";

import { IntroStageContext } from "./intro-stage-context.ts";

import type { IntroStageStore } from "./IntroStageStore.ts";


type UseIntroStageReturn = IntroStageStore | null;

const useIntroStage = (): UseIntroStageReturn => {
    return useContext(IntroStageContext);
};

export { useIntroStage };
export type { UseIntroStageReturn };

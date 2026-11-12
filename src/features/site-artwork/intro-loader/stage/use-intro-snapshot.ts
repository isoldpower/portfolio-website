import { useSyncExternalStore } from "react";

import { DONE_SNAPSHOT } from "../constants.ts";
import { useIntroStage } from "./use-intro-stage.ts";

import type { IntroSnapshot } from "../types.ts";


const subscribeNowhere = (): (() => void) => {
    return () => undefined;
};

const readDone = (): IntroSnapshot => {
    return DONE_SNAPSHOT;
};

type UseIntroSnapshotReturn = IntroSnapshot;

const useIntroSnapshot = (): UseIntroSnapshotReturn => {
    const store = useIntroStage();
    const subscribe = store?.subscribe ?? subscribeNowhere;
    const getSnapshot = store?.getSnapshot ?? readDone;

    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};

export { useIntroSnapshot };
export type { UseIntroSnapshotReturn };

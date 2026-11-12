import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useIntroNames } from "../sequence/use-intro-names.ts";
import { useIntroRefs } from "../sequence/use-intro-refs.ts";
import { useIntroStage } from "../stage/use-intro-stage.ts";
import { IntroSceneContext } from "./intro-scene-context.ts";
import { IntroSceneRunner } from "./intro-scene-runner.tsx";
import { useSceneState } from "./use-scene-state.ts";

import type { FC, ReactNode } from "react";


interface IntroSceneProviderProps {
    children: ReactNode;
}

const IntroSceneProvider: FC<IntroSceneProviderProps> = ({ children }) => {
    const { t } = useTranslation();
    const store = useIntroStage();
    const refs = useIntroRefs();
    const names = useIntroNames();
    const scene = useSceneState({
        gloss: t("intro.gloss"),
        isFinished: !store || store.getSnapshot().phase === "done",
    });

    const value = useMemo(() => {
        return { scene, refs, names };
    }, [scene, refs, names]);

    return (
        <IntroSceneContext value={value}>
            <IntroSceneRunner />
            {children}
        </IntroSceneContext>
    );
};

IntroSceneProvider.displayName = "IntroSceneProvider";

export { IntroSceneProvider };
export type { IntroSceneProviderProps };

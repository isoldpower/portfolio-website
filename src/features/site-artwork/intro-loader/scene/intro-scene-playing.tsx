import { useSceneSelector } from "./use-scene-selector.ts";

import type { FC, ReactNode } from "react";


interface IntroScenePlayingProps {
    children: ReactNode;
}

const IntroScenePlaying: FC<IntroScenePlayingProps> = ({ children }) => {
    const isFinished = useSceneSelector((view) => {
        return view.isFinished;
    });

    return isFinished ? null : children;
};

IntroScenePlaying.displayName = "IntroScenePlaying";

export { IntroScenePlaying };
export type { IntroScenePlayingProps };

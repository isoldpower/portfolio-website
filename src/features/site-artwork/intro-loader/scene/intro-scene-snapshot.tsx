import { useSceneSelector } from "./use-scene-selector.ts";

import type { SnapshotView } from "../types.ts";
import type { FC, ReactNode } from "react";


interface IntroSceneSnapshotProps {
    children: (snapshot: SnapshotView) => ReactNode;
}

const IntroSceneSnapshot: FC<IntroSceneSnapshotProps> = ({ children }) => {
    const snapshot = useSceneSelector((view) => {
        return view.snapshot;
    });

    return snapshot ? children(snapshot) : null;
};

IntroSceneSnapshot.displayName = "IntroSceneSnapshot";

export { IntroSceneSnapshot };
export type { IntroSceneSnapshotProps };

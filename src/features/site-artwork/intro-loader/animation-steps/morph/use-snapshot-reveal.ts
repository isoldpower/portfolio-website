import { useCallback } from "react";

import { sleep } from "@shared/lib/utilities";

import {
    GLOSS_FALLBACK_WIDTH,
    LAYOUT_SETTLE_MS,
    SNAPSHOT_MAX_HEIGHT,
    SNAPSHOT_OPEN_MS,
    SNAPSHOT_REVEAL_MS,
    SNAPSHOT_VIEWPORT_RATIO,
} from "../../constants.ts";
import { useIntroScene } from "../../scene/use-intro-scene.ts";

import type { RabbitSnapshot, SnapshotView } from "../../types.ts";


type UseSnapshotRevealReturn = (shot: RabbitSnapshot) => Promise<void>;

const useSnapshotReveal = (): UseSnapshotRevealReturn => {
    const { scene, refs } = useIntroScene();

    const viewOf = useCallback(({ src, rect, filter }: RabbitSnapshot): SnapshotView => {
        const height = Math.min(SNAPSHOT_MAX_HEIGHT, window.innerHeight * SNAPSHOT_VIEWPORT_RATIO);
        return { src, width: (height * rect.width) / rect.height, height, filter };
    }, []);

    const foldGloss = useCallback(async () => {
        scene.updateView({ glossWidth: refs.gloss.current?.getBoundingClientRect().width ?? GLOSS_FALLBACK_WIDTH });
        await sleep(LAYOUT_SETTLE_MS);
        scene.updateView({ glossWidth: 0 });
    }, [scene, refs]);

    return useCallback(async (shot: RabbitSnapshot) => {
        await foldGloss();
        scene.updateView({ snapshot: viewOf(shot) });
        await sleep(SNAPSHOT_OPEN_MS);
        scene.updateView({ isSnapshotRevealed: true });
        await sleep(SNAPSHOT_REVEAL_MS);
        await refs.snapshot.current?.decode().catch(() => {
            return undefined;
        });
    }, [scene, refs, foldGloss, viewOf]);
};

export { useSnapshotReveal };
export type { UseSnapshotRevealReturn };

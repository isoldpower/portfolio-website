import { useCallback, useMemo } from "react";
import { Box3, Vector3 } from "three";

import { RIGHT_PADDING, SWAY_MARGIN } from "../constants.ts";

import type { AsciiGrid, AsciiTarget } from "../types.ts";
import type { Object3D, OrthographicCamera } from "three";


type UseCameraFitReturn = (
    scene: Object3D,
    grid: AsciiGrid,
    target: AsciiTarget
) => boolean;

interface ViewSize {
    width: number;
    height: number;
}

const useCameraFit = (): UseCameraFitReturn => {
    const scratch = useMemo(() => ({
        bounds: new Box3(),
        size: new Vector3(),
        center: new Vector3()
    }), []);

    const measureScene = useCallback((
        scene: Object3D
    ): boolean => {
        const { bounds, size, center } = scratch;
        scene.updateMatrixWorld(true);
        bounds.setFromObject(scene, true);

        if (bounds.isEmpty()) {
            return false;
        } else {
            bounds.getSize(size);
            bounds.getCenter(center);

            return true;
        }
    }, [scratch]);

    const viewSize = useCallback((
        { columns, rows }: AsciiGrid,
    ): ViewSize => {
        const contentWidth = scratch.size.x * (1 + SWAY_MARGIN);
        const contentHeight = scratch.size.y * (1 + SWAY_MARGIN);
        const gridAspect = columns / rows;
        const width = contentWidth / contentHeight > gridAspect
            ? contentWidth
            : contentHeight * gridAspect;

        return { width, height: width / gridAspect };
    }, [scratch]);

    const applyFrustum = useCallback((
        camera: OrthographicCamera,
        { width, height }: ViewSize
    ) => {
        const { bounds, size, center } = scratch;
        camera.right = bounds.max.x + size.x * RIGHT_PADDING;
        camera.left = camera.right - width;
        camera.top = center.y + height / 2;
        camera.bottom = center.y - height / 2;
        camera.updateProjectionMatrix();
    }, [scratch]);

    return useCallback((
        scene,
        grid,
        target
    ) => {
        if (!measureScene(scene)) {
            return false;
        }

        applyFrustum(target.camera, viewSize(grid));
        target.isFitted = true;

        return true;
    }, [measureScene, viewSize, applyFrustum]);
};

export { useCameraFit };
export type { UseCameraFitReturn };

import { useCallback } from "react";
import { Box3, Group, Sphere } from "three";

import type { Object3D } from "three";


type UseModelNormalizerReturn = (scene: Object3D) => Object3D;

const useModelNormalizer = (): UseModelNormalizerReturn => {
    return useCallback((scene: Object3D): Object3D => {
        scene.updateMatrixWorld(true);
        const bounds = new Box3().setFromObject(scene).getBoundingSphere(new Sphere());
        scene.position.copy(bounds.center).multiplyScalar(-1);

        const normalized = new Group();
        normalized.add(scene);
        normalized.scale.setScalar(1 / bounds.radius);

        return normalized;
    }, []);
};

export { useModelNormalizer };
export type { UseModelNormalizerReturn };

import { useCallback, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { DOWNLOAD_PROGRESS_SHARE, MODEL_URL } from "../constants.ts";
import { useMeshDressing } from "./use-mesh-dressing.ts";
import { useModelNormalizer } from "./use-model-normalizer.ts";

import type { Material, Object3D } from "three";


interface UseRabbitModelParams {
    material: Material;
    onProgress: (progress: number) => void;
}

type UseRabbitModelReturn = Object3D;

const useRabbitModel = ({ material, onProgress }: UseRabbitModelParams): UseRabbitModelReturn => {
    const reportProgress = useCallback((event: ProgressEvent) => {
        if (event.total > 0) {
            onProgress(DOWNLOAD_PROGRESS_SHARE * (event.loaded / event.total));
        }
    }, [onProgress]);
    const gltf = useLoader(
        GLTFLoader,
        MODEL_URL,
        undefined,
        reportProgress
    );
    const dressMeshes = useMeshDressing(material);
    const normalize = useModelNormalizer();

    const prepareModel = useCallback((): Object3D => {
        const scene = gltf.scene.clone(true);
        dressMeshes(scene);
        return normalize(scene);
    }, [gltf, dressMeshes, normalize]);

    return useMemo(() => {
        return prepareModel();
    }, [prepareModel]);
};

export { useRabbitModel };
export type { UseRabbitModelParams, UseRabbitModelReturn };

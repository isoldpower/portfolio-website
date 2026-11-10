import { useCallback, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { MODEL_URL } from "../constants.ts";
import { useMeshDressing } from "./use-mesh-dressing.ts";
import { useModelNormalizer } from "./use-model-normalizer.ts";

import type { Material, Object3D } from "three";


type UseRabbitModelReturn = Object3D;

const useRabbitModel = (material: Material): UseRabbitModelReturn => {
    const gltf = useLoader(GLTFLoader, MODEL_URL);
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
export type { UseRabbitModelReturn };

import { useCallback } from "react";
import { Mesh } from "three";

import { KEPT_ATTRIBUTE } from "../constants.ts";

import type { BufferGeometry, Material, Object3D } from "three";


type UseMeshDressingReturn = (scene: Object3D) => void;

const useMeshDressing = (material: Material): UseMeshDressingReturn => {
    const facetGeometry = useCallback((geometry: BufferGeometry): BufferGeometry => {
        const faceted = geometry.index ? geometry.toNonIndexed() : geometry.clone();

        Object.keys(faceted.attributes)
            .filter((name) => {
                return name !== KEPT_ATTRIBUTE;
            })
            .forEach((name) => {
                faceted.deleteAttribute(name);
            });

        return faceted;
    }, []);

    return useCallback((scene: Object3D) => {
        scene.traverse((node) => {
            if (!(node instanceof Mesh)) {
                return;
            }

            node.geometry = facetGeometry(node.geometry);
            node.material = material;
        });
    }, [facetGeometry, material]);
};

export { useMeshDressing };
export type { UseMeshDressingReturn };

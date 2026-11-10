import { useRabbitModel } from "./model/use-rabbit-model.ts";

import type { Material, Object3D } from "three";
import type { ReactNode } from "react";


interface RabbitModelProps {
    material: Material;
    onProgress: (progress: number) => void;
    children: (model: Object3D) => ReactNode;
}

function RabbitModel({
    material,
    onProgress,
    children
}: RabbitModelProps) {
    const model = useRabbitModel({ material, onProgress });

    return children(model);
}

export { RabbitModel };
export type { RabbitModelProps };

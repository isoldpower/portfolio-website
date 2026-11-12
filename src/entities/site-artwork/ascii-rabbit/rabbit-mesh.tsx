import { useRef } from "react";

import type { Object3D } from "three";


interface RabbitMeshProps {
    model: Object3D;
}

function RabbitMesh({ model }: RabbitMeshProps) {
    const TILT_RADIANS = useRef<number>((35 * Math.PI) / 180);
    const YAW_RADIANS = useRef<number>(-0.44);

    return (
        <group rotation-x={TILT_RADIANS.current}>
            <group rotation-y={YAW_RADIANS.current}>
                <primitive object={model} />
            </group>
        </group>
    );
}

export { RabbitMesh };
export type { RabbitMeshProps };

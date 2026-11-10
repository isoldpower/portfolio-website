import { Canvas } from "@react-three/fiber";

import type { ReactNode } from "react";


interface RabbitRenderStageProps {
    children: ReactNode;
}

function RabbitRenderStage({ children }: RabbitRenderStageProps) {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 size-px opacity-0">
            <Canvas
                flat
                linear
                dpr={1}
                gl={{ antialias: false, alpha: true }}
            >
                {children}
            </Canvas>
        </div>
    );
}

export { RabbitRenderStage };
export type { RabbitRenderStageProps };

import { CONNECTION_TONES, markerIdOf, resolveToneColorClass } from "@entities/integration/visual-map";
import { useFinanceInfraCanvas } from "./context/use-finance-infra-canvas.ts";

import type { FinanceInfraRoutedConnection } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasEdgeLayerProps {
    children: (connection: FinanceInfraRoutedConnection) => ReactNode;
}

const FinanceInfraCanvasEdgeLayer: FC<FinanceInfraCanvasEdgeLayerProps> = ({ children }) => {
    const { markerPrefix, routedConnections } = useFinanceInfraCanvas();

    return (
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
                {CONNECTION_TONES.map((tone) => (
                    <marker
                        key={tone}
                        id={markerIdOf(markerPrefix, tone)}
                        viewBox="0 0 8 8"
                        refX="7"
                        refY="4"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                        className={resolveToneColorClass(tone)}
                    >
                        <path d="M 0 0 L 8 4 L 0 8 z" fill="currentColor" />
                    </marker>
                ))}
            </defs>
            <>
                {routedConnections.map((connection) => {
                    return children(connection);
                })}
            </>
        </svg>
    );
};

export { FinanceInfraCanvasEdgeLayer };
export type { FinanceInfraCanvasEdgeLayerProps };

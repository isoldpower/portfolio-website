import { CONNECTION_TONES, resolveToneColorClass } from "../visual-map";

import type { FinanceConnectionTone } from "../model/types.ts";
import type { FC, ReactNode } from "react";


interface FinanceInfraEdgeLayerProps {
    markerPrefix: string;
    children: ReactNode;
}

function markerIdOf(markerPrefix: string, tone: FinanceConnectionTone): string {
    return `${markerPrefix}-arrow-${tone}`;
}

function renderMarker(markerPrefix: string, tone: FinanceConnectionTone) {
    return (
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
    );
}

const FinanceInfraEdgeLayer: FC<FinanceInfraEdgeLayerProps> = ({
    markerPrefix,
    children
}) => {
    return (
        <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" aria-hidden>
            <defs>
                {CONNECTION_TONES.map(renderMarker.bind(null, markerPrefix))}
            </defs>
            {children}
        </svg>
    );
};

export { FinanceInfraEdgeLayer, markerIdOf };
export type { FinanceInfraEdgeLayerProps };

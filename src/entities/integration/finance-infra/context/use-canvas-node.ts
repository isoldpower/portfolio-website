import { useFinanceInfraCanvas } from "./use-finance-infra-canvas.ts";

import type { FinanceInfraEmphasis, FinanceInfraFocusHandlers } from "@entities/integration/model";
import type { RefCallback } from "react";


interface UseCanvasNodeReturn extends FinanceInfraFocusHandlers {
    ref: RefCallback<HTMLElement>;
    emphasis: FinanceInfraEmphasis;
}

function useCanvasNode(nodeId: string): UseCanvasNodeReturn {
    const { registry, focusHandlers, nodeEmphasisOf } = useFinanceInfraCanvas();

    return {
        ref: registry.refFor(nodeId),
        emphasis: nodeEmphasisOf(nodeId),
        ...focusHandlers,
    };
}

export { useCanvasNode };

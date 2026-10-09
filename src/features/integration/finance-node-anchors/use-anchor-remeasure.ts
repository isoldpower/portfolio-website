import { useLayoutEffect } from "react";

import type { NodeAnchorRegistry } from "./NodeAnchorRegistry.ts";


interface UseAnchorRemeasureParams {
    registry: NodeAnchorRegistry;
    trigger: unknown;
}

const useAnchorRemeasure = ({ registry, trigger }: UseAnchorRemeasureParams): void => {
    useLayoutEffect(() => {
        registry.remeasure();
    }, [registry, trigger]);
};

export { useAnchorRemeasure };
export type { UseAnchorRemeasureParams };

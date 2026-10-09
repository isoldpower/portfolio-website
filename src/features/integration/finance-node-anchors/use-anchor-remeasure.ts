import { useLayoutEffect } from "react";

import type { NodeAnchorRegistry } from "./lib/NodeAnchorRegistry.ts";


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

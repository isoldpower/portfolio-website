import { useId, useMemo } from "react";


const useMarkerPrefix = (): string => {
    const canvasId = useId();

    return useMemo(() => {
        return `finance-infra-${canvasId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
    }, [canvasId]);
};

export { useMarkerPrefix };

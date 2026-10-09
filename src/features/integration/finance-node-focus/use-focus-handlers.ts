import { useCallback, useMemo } from "react";

import type { FinanceInfraFocusHandlers } from "@entities/integration/model";
import type { Dispatch, SetStateAction, SyntheticEvent } from "react";


const useFocusHandlers = (setFocusedNodeId: Dispatch<SetStateAction<string | null>>): FinanceInfraFocusHandlers => {
    const focusTarget = useCallback((event: SyntheticEvent<HTMLElement>) => {
        setFocusedNodeId(event.currentTarget.dataset.nodeId ?? null);
    }, [setFocusedNodeId]);
    const clearFocus = useCallback(() => {
        setFocusedNodeId(null);
    }, [setFocusedNodeId]);

    return useMemo(() => ({
        onPointerEnter: focusTarget,
        onPointerLeave: clearFocus,
        onFocus: focusTarget,
        onBlur: clearFocus,
    }), [focusTarget, clearFocus]);
};

export { useFocusHandlers };

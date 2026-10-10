import { useCallback, useMemo, useRef } from "react";

import { useInView } from "@shared/lib/hooks";

import type { RefCallback, RefObject } from "react";


const PANEL_VIEW_MARGIN = "0px 0px -80px 0px";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface UseTraceDrawerReturn {
    panelRef: RefCallback<HTMLDivElement>;
    triggerRef: RefObject<HTMLButtonElement | null>;
    isDrawerHidden: boolean;
    revealPanel: () => void;
}

const useTraceDrawer = (): UseTraceDrawerReturn => {
    const { ref: panelRef, isInView: isPanelInView } = useInView<HTMLDivElement>({ rootMargin: PANEL_VIEW_MARGIN });
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const isDrawerHidden = isPanelInView !== false;

    const revealPanel = useCallback(() => {
        const trigger = triggerRef.current;

        if (trigger === null) {
            return;
        }

        trigger.scrollIntoView({
            behavior: window.matchMedia(REDUCED_MOTION_QUERY).matches
                ? "auto"
                : "smooth",
            block: "center",
        });
        trigger.focus({ preventScroll: true });
    }, []);

    return useMemo(() => ({
        panelRef,
        triggerRef,
        isDrawerHidden,
        revealPanel,
    }), [panelRef, isDrawerHidden, revealPanel]);
};

export { useTraceDrawer };
export type { UseTraceDrawerReturn };

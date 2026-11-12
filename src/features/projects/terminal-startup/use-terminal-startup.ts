import { useCallback, useMemo, useRef, useState } from "react";

import type { TerminalAdapterBindings, TerminalSurface } from "@shared/ui-toolkit/terminal";


interface UseTerminalStartupReturn {
    bindings: TerminalAdapterBindings;
    hasStarted: boolean;
}

const useTerminalStartup = (adapterBindings: TerminalAdapterBindings): UseTerminalStartupReturn => {
    const [hasStarted, setHasStarted] = useState(false);
    const hasStartedRef = useRef(false);

    const markStarted = useCallback(() => {
        if (!hasStartedRef.current) {
            hasStartedRef.current = true;
            setHasStarted(true);
        }
    }, []);

    const observeSurfaceWrites = useCallback((terminal: TerminalSurface): TerminalSurface => {
        return {
            get cols() {
                return terminal.cols;
            },
            get rows() {
                return terminal.rows;
            },
            get element() {
                return terminal.element;
            },
            get bridge() {
                return terminal.bridge;
            },
            write: (data) => {
                markStarted();
                terminal.write(data);
            },
        };
    }, [markStarted]);

    const handleReady = useCallback((terminal: TerminalSurface) => {
        adapterBindings.onReady(observeSurfaceWrites(terminal));
    }, [adapterBindings, observeSurfaceWrites]);

    const startupBindings = useMemo(() => {
        return { ...adapterBindings, onReady: handleReady };
    }, [adapterBindings, handleReady]);

    return useMemo(() => {
        return { bindings: startupBindings, hasStarted };
    }, [startupBindings, hasStarted]);
};

export { useTerminalStartup };
export type { UseTerminalStartupReturn };

import { useMemo } from "react";


const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const usePrefersReducedMotion = (): boolean => {
    return useMemo(() => {
        return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
    }, []);
};

export { usePrefersReducedMotion };

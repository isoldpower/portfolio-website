import { useCallback } from "react";


type UseScrollLockReturn = () => () => void;

const useScrollLock = (): UseScrollLockReturn => {
    return useCallback(() => {
        const root = document.documentElement;
        const previous = root.style.overflow;
        root.style.overflow = "hidden";

        return () => {
            root.style.overflow = previous;
        };
    }, []);
};

export { useScrollLock };
export type { UseScrollLockReturn };

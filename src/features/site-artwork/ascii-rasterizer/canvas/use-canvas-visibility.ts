import { useEffect, useRef } from "react";

import type { RefObject } from "react";


type UseCanvasVisibilityReturn = RefObject<boolean>;

const useCanvasVisibility = (canvas: RefObject<HTMLCanvasElement | null>): UseCanvasVisibilityReturn => {
    const isVisible = useRef(true);

    useEffect(() => {
        const element = canvas.current;
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            isVisible.current = entry.isIntersecting;
        });

        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [canvas]);

    return isVisible;
};

export { useCanvasVisibility };
export type { UseCanvasVisibilityReturn };

import { useEffect } from "react";


const useScrollFocus = (isFocused: boolean, targetId?: string): void => {
    function scrollBehavior(): ScrollBehavior {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth";
    }

    function scrollToFocus(targetId: string): void {
        document.getElementById(targetId)?.scrollIntoView({
            behavior: scrollBehavior(),
            block: "center",
        });
    }

    useEffect(() => {
        if (isFocused && targetId !== undefined) {
            scrollToFocus(targetId);
        }
    }, [isFocused, targetId]);
};

export { useScrollFocus };

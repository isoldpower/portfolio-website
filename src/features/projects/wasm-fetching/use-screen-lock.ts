import {useEffect, useRef} from "react";


interface SavedStyle {
    style: CSSStyleDeclaration;
    property: string;
    value: string;
    priority: string;
}

interface ActiveLock {
    savedStyles: SavedStyle[];
    onTouchMove: (event: TouchEvent) => void;
}

const useScreenLock = (isLocked: boolean, touchAreaId?: string): void => {
    const ACTIVE_LISTENER = useRef<AddEventListenerOptions>({ passive: false });
    const LOCKED_STYLES = useRef<ReadonlyArray<[property: string, value: string]>>([
        ["overflow", "hidden"],
        ["overscroll-behavior", "none"],
        ["scrollbar-gutter", "stable"],
    ]);

    function applyLockedStyles(style: CSSStyleDeclaration, savedStyles: SavedStyle[]): void {
        for (const [property, value] of LOCKED_STYLES.current) {
            savedStyles.push({
                style,
                property,
                value: style.getPropertyValue(property),
                priority: style.getPropertyPriority(property),
            });

            style.setProperty(property, value);
        }
    }

    function blockTouchOutside(touchArea: HTMLElement | null, event: TouchEvent): void {
        const isInsideTouchArea = event.target instanceof Node
            && touchArea?.contains(event.target) === true;

        if (!isInsideTouchArea && event.cancelable) {
            event.preventDefault();
        }
    }

    function unlockScreen(lock: ActiveLock): void {
        document.removeEventListener("touchmove", lock.onTouchMove, ACTIVE_LISTENER.current);
        for (const { style, property, value, priority } of lock.savedStyles) {
            style.setProperty(property, value, priority);
        }
    }

    function lockScreen(touchAreaId?: string): () => void {
        const touchArea = touchAreaId === undefined
            ? null
            : document.getElementById(touchAreaId);
        const lock: ActiveLock = {
            savedStyles: [],
            onTouchMove: blockTouchOutside.bind(null, touchArea),
        };

        applyLockedStyles(document.documentElement.style, lock.savedStyles);
        applyLockedStyles(document.body.style, lock.savedStyles);
        document.addEventListener("touchmove", lock.onTouchMove, ACTIVE_LISTENER.current);

        return unlockScreen.bind(null, lock);
    }

    useEffect(() => {
        return isLocked ? lockScreen(touchAreaId) : undefined;
    }, [isLocked, touchAreaId]);
};

export { useScreenLock };

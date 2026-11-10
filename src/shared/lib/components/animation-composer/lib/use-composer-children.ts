import { Children, isValidElement, useCallback, useMemo } from "react";

import type { ReactElement, ReactNode } from "react";


type ComposerTarget = ReactElement<{ className?: string }>;

interface UseComposerChildrenReturn {
    animations: readonly ReactElement[];
    target: ComposerTarget;
}

const useComposerChildren = (children: ReactNode): UseComposerChildrenReturn => {
    const split = useCallback((): UseComposerChildrenReturn => {
        const elements = Children.toArray(children).filter(isValidElement);
        const target = elements.at(-1);

        if (!target) {
            throw new Error("AnimationComposer expects a target element as its last child.");
        }

        return { animations: elements.slice(0, -1), target: target as ComposerTarget };
    }, [children]);

    return useMemo(() => split(), [split]);
};

export { useComposerChildren };
export type { UseComposerChildrenReturn, ComposerTarget };

import { useContext, useLayoutEffect, useRef } from "react";

import { AnimationRegistryContext } from "./animation-composer-context.ts";

import type { RegisterAnimationProps } from "./types.ts";


function RegisterAnimation({ id, className }: RegisterAnimationProps) {
    const registration = useContext(AnimationRegistryContext);
    const appliedClassName = useRef<string | null>(null);

    registration?.registry.set(id, className);

    useLayoutEffect(() => {
        if (appliedClassName.current !== null && appliedClassName.current !== className) {
            registration?.invalidate();
        }

        appliedClassName.current = className;
    }, [className, registration]);

    return null;
}

export { RegisterAnimation };

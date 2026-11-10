import { useContext } from "react";

import { AnimationRegistryContext } from "./animation-composer-context.ts";

import type { RegisterAnimationProps } from "./types.ts";


function RegisterAnimation({ id, className }: RegisterAnimationProps) {
    const registry = useContext(AnimationRegistryContext);

    registry?.set(id, className);

    return null;
}

export { RegisterAnimation };

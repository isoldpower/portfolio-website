import { useContext } from "react";

import { AnimationRegistryContext, InheritedAnimationsContext } from "./animation-composer-context.ts";
import { ComposedTarget } from "./lib/composed-target.tsx";
import { useComposerChildren } from "./lib/use-composer-children.ts";

import type { AnimationRegistry } from "./types.ts";
import type { ReactNode } from "react";


interface AnimationComposerProps {
    children: ReactNode;
}

function AnimationComposer({ children }: AnimationComposerProps) {
    const inherited = useContext(InheritedAnimationsContext);
    const { animations, target } = useComposerChildren(children);
    const registry: AnimationRegistry = new Map(inherited.map((animation) => [animation.id, animation.className]));

    return (
        <AnimationRegistryContext value={registry}>
            {animations}
            <ComposedTarget
                registry={registry}
                target={target}
                isNestedComposer={target.type === AnimationComposer}
            />
        </AnimationRegistryContext>
    );
}

export { AnimationComposer };
export type { AnimationComposerProps };

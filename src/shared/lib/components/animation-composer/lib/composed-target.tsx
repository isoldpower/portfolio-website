import { cloneElement } from "react";

import { cn } from "@shared/lib/utilities";

import { AnimationRegistryContext, InheritedAnimationsContext, NO_ANIMATIONS } from "../animation-composer-context.ts";

import type { AnimationRegistry } from "../types.ts";
import type { ComposerTarget } from "./use-composer-children.ts";


interface ComposedTargetProps {
    registry: AnimationRegistry;
    target: ComposerTarget;
    isNestedComposer: boolean;
}

function ComposedTarget({
    registry,
    target,
    isNestedComposer
}: ComposedTargetProps) {
    const animations = [...registry].map(([id, className]) => ({ id, className }));

    return (
        <AnimationRegistryContext value={null}>
            {isNestedComposer ? (
                <InheritedAnimationsContext value={animations}>
                    {target}
                </InheritedAnimationsContext>
            ) : (
                <InheritedAnimationsContext value={NO_ANIMATIONS}>
                    {cloneElement(target, {
                        className: cn(animations.map((animation) => animation.className), target.props.className),
                    })}
                </InheritedAnimationsContext>
            )}
        </AnimationRegistryContext>
    );
}

export { ComposedTarget };
export type { ComposedTargetProps };

import { createContext } from "react";

import type { AnimationDescriptor, AnimationRegistration } from "./types.ts";


const NO_ANIMATIONS: readonly AnimationDescriptor[] = [];

const AnimationRegistryContext = createContext<AnimationRegistration | null>(null);

const InheritedAnimationsContext = createContext<readonly AnimationDescriptor[]>(NO_ANIMATIONS);

export { AnimationRegistryContext, InheritedAnimationsContext, NO_ANIMATIONS };

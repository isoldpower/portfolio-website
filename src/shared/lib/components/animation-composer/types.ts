interface AnimationDescriptor {
    id: string;
    className: string;
}

type RegisterAnimationProps = AnimationDescriptor;

type AnimationRegistry = Map<string, string>;

interface AnimationRegistration {
    registry: AnimationRegistry;
    invalidate: () => void;
}

export type { AnimationDescriptor, RegisterAnimationProps, AnimationRegistry, AnimationRegistration };

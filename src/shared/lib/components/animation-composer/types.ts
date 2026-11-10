interface AnimationDescriptor {
    id: string;
    className: string;
}

type RegisterAnimationProps = AnimationDescriptor;

type AnimationRegistry = Map<string, string>;

export type { AnimationDescriptor, RegisterAnimationProps, AnimationRegistry };

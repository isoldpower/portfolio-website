import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes, Ref } from "react";


type IntroNameLineWordProps = HTMLAttributes<HTMLSpanElement> & {
    ref?: Ref<HTMLSpanElement>;
};

const IntroNameLineWord: FC<IntroNameLineWordProps> = ({ className, ...props }) => {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "font-display text-[min(7.375rem,9vw)] max-xs:text-[7vw] leading-none font-[520] tracking-[-0.01em] text-accent text-shadow-hero",
                className
            )}
            {...props}
        />
    );
};

IntroNameLineWord.displayName = "IntroNameLineWord";

export { IntroNameLineWord };
export type { IntroNameLineWordProps };

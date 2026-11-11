import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { FC, HTMLAttributes, Ref } from "react";


type IntroNameLineWordProps = HTMLAttributes<HTMLSpanElement> & {
    ref?: Ref<HTMLElement>;
};

const IntroNameLineWord: FC<IntroNameLineWordProps> = ({ className, ...props }) => {
    return (
        <Text
            aria-hidden="true"
            family="display"
            tone="accent"
            className={cn(
                "text-[min(7.375rem,9vw)] max-xs:text-[7vw] leading-none font-[520]",
                "tracking-[-0.01em] text-shadow-hero",
                className
            )}
            {...props}
        />
    );
};

IntroNameLineWord.displayName = "IntroNameLineWord";

export { IntroNameLineWord };
export type { IntroNameLineWordProps };

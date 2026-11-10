import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes, Ref } from "react";


type IntroNameLineGlossProps = HTMLAttributes<HTMLSpanElement> & {
    labelRef?: Ref<HTMLSpanElement>;
    slotWidth: number | null;
};

const IntroNameLineGloss: FC<IntroNameLineGlossProps> = ({
    labelRef,
    slotWidth,
    className,
    style,
    children,
    ...props
}) => {
    return (
        <span
            style={{ ...style, width: slotWidth ?? "auto" }}
            className={cn(
                "inline-flex overflow-hidden",
                slotWidth === 0 ? "ml-0 opacity-0" : "ml-7 opacity-100 max-xs:ml-3",
                className
            )}
            {...props}
        >
            <span
                ref={labelRef}
                className="font-mono text-lg tracking-[0.02em] whitespace-pre text-foreground max-xs:text-sm"
            >
                {children}
            </span>
        </span>
    );
};

IntroNameLineGloss.displayName = "IntroNameLineGloss";

export { IntroNameLineGloss };
export type { IntroNameLineGlossProps };

import { cn } from "@shared/lib/utilities";
import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC, HTMLAttributes, Ref } from "react";


type IntroNameLineGlossProps = HTMLAttributes<HTMLSpanElement> & {
    labelRef?: Ref<HTMLElement>;
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
        <PlainText
            style={{ ...style, width: slotWidth ?? "auto" }}
            className={cn(
                "inline-flex overflow-hidden",
                slotWidth === 0 ? "ml-0 opacity-0" : "ml-7 opacity-100 max-xs:ml-3",
                className
            )}
            {...props}
        >
            <Text
                ref={labelRef}
                family="mono"
                size="lg"
                tone="strong"
                className="tracking-[0.02em] whitespace-pre max-xs:text-sm"
            >
                {children}
            </Text>
        </PlainText>
    );
};

IntroNameLineGloss.displayName = "IntroNameLineGloss";

export { IntroNameLineGloss };
export type { IntroNameLineGlossProps };

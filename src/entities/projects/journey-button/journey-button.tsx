import { cn } from "@shared/lib/utilities";

import type { ButtonHTMLAttributes, FC } from "react";


type JourneyButtonProps = ButtonHTMLAttributes<HTMLElement> & {
    as?: "a" | "button" | "span";
    href?: string;
};

const JourneyButton: FC<JourneyButtonProps> = ({ as = "span", className, ...props }) => {
    const Element = as;

    return (
        <Element
            className={cn(
                "inline-block cursor-pointer border border-accent bg-background",
                "px-4.5 py-2.5 font-mono text-accent no-underline",
                className
            )}
            {...props}
        />
    );
};

JourneyButton.displayName = "JourneyButton";

export { JourneyButton };
export type { JourneyButtonProps };

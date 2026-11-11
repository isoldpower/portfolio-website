import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type AboutBodyVariableLineProps = HTMLAttributes<HTMLDivElement> & {
    number: number;
    isFocused: boolean;
};

const AboutBodyVariableLine: FC<AboutBodyVariableLineProps> = ({
    number,
    isFocused,
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn(
                "grid min-h-[23px] cursor-default grid-cols-[19px_minmax(0,1fr)] items-start leading-[23px]",
                "md:col-span-full md:grid-cols-subgrid md:items-center md:leading-[inherit] md:whitespace-pre",
                className
            )}
            {...props}
        >
            <span className={cn(isFocused ? "text-accent" : "opacity-70")}>
                {number}
            </span>
            {children}
        </div>
    );
};

AboutBodyVariableLine.displayName = "AboutBodyVariableLine";

export { AboutBodyVariableLine };
export type { AboutBodyVariableLineProps };

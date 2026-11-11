import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type AboutBodyVariablesProps = HTMLAttributes<HTMLDivElement>;

const AboutBodyVariables: FC<AboutBodyVariablesProps> = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                "col-span-12 self-start p-3 max-md:order-1",
                "bg-background/55 font-mono text-md text-foreground backdrop-blur-[10px]",
                "lg:col-span-8 lg:self-end",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "flex flex-col md:grid md:w-max md:min-w-full",
                    "md:grid-cols-[19px_auto_auto_16px_minmax(0,1fr)]"
                )}
            >
                {children}
            </div>
        </div>
    );
};

AboutBodyVariables.displayName = "AboutBodyVariables";

export { AboutBodyVariables };
export type { AboutBodyVariablesProps };

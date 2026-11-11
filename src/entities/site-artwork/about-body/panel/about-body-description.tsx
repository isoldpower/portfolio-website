import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type AboutBodyDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const AboutBodyDescription: FC<AboutBodyDescriptionProps> = ({ className, ...props }) => {
    return (
        <p
            className={cn(
                "col-span-12 m-0 self-start p-3 leading-[1.6] whitespace-pre-line max-md:order-3",
                "bg-background/55 font-mono text-md text-foreground backdrop-blur-[10px]",
                "md:col-span-7 lg:col-span-8",
                className
            )}
            {...props}
        />
    );
};

AboutBodyDescription.displayName = "AboutBodyDescription";

export { AboutBodyDescription };
export type { AboutBodyDescriptionProps };

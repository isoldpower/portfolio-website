import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { FC, HTMLAttributes } from "react";


type AboutBodyDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const AboutBodyDescription: FC<AboutBodyDescriptionProps> = ({ className, ...props }) => {
    return (
        <Text
            as="p"
            family="mono"
            size="md"
            tone="strong"
            className={cn(
                "col-span-12 m-0 self-start p-3 leading-[1.6] whitespace-pre-line max-md:order-3",
                "bg-background/55 backdrop-blur-[10px]",
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

import type { FC, ReactNode } from "react";
import {cn} from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";


interface JourneyProjectInfoTitleProps {
    children: ReactNode;
}

const JourneyProjectInfoTitle: FC<JourneyProjectInfoTitleProps> = ({ children }) => {
    return (
        <Text
            as="h3"
            weight="bold"
            tone="highlight"
            className={cn(
                "my-3.5 text-[1.625rem] leading-[1.15] tracking-[-1px]",
                "[text-shadow:0_0_28px_#78a5ff18] md:text-[2.25rem]"
            )}
        >
            {children}
        </Text>
    );
};

JourneyProjectInfoTitle.displayName = "JourneyProjectInfoTitle";

export { JourneyProjectInfoTitle };
export type { JourneyProjectInfoTitleProps };

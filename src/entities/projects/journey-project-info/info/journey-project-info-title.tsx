import type { FC, ReactNode } from "react";
import {cn} from "@shared/lib/utilities";


interface JourneyProjectInfoTitleProps {
    children: ReactNode;
}

const JourneyProjectInfoTitle: FC<JourneyProjectInfoTitleProps> = ({ children }) => {
    return (
        <h3
            className={cn(
                "my-3.5 text-[1.625rem] leading-[1.15] font-bold tracking-[-1px]",
                "text-highlight [text-shadow:0_0_28px_#78a5ff18] md:text-[2.25rem]"
            )}
        >
            {children}
        </h3>
    );
};

JourneyProjectInfoTitle.displayName = "JourneyProjectInfoTitle";

export { JourneyProjectInfoTitle };
export type { JourneyProjectInfoTitleProps };

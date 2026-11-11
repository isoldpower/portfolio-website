import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface JourneyStageFooterProps {
    children: ReactNode;
}

const JourneyStageFooter: FC<JourneyStageFooterProps> = ({ children }) => {
    return (
        <footer
            className={cn(
                "absolute inset-x-[9.8%] bottom-3.5 flex items-center justify-end gap-4",
                "text-xs tracking-[0.5px] whitespace-nowrap sm:justify-between sm:text-[0.8125rem]"
            )}
        >
            {children}
        </footer>
    );
};

JourneyStageFooter.displayName = "JourneyStageFooter";

export { JourneyStageFooter };
export type { JourneyStageFooterProps };

import type { FC, ReactNode } from "react";


interface JourneyStageHeaderProps {
    children: ReactNode;
}

const JourneyStageHeader: FC<JourneyStageHeaderProps> = ({ children }) => {
    return (
        <header className="relative flex flex-wrap justify-between gap-x-6 gap-y-1 text-xs tracking-[1px]">
            {children}
        </header>
    );
};

JourneyStageHeader.displayName = "JourneyStageHeader";

export { JourneyStageHeader };
export type { JourneyStageHeaderProps };

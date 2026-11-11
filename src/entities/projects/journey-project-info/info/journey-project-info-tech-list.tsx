import type { FC, ReactNode } from "react";


interface JourneyProjectInfoTechListProps {
    children: ReactNode;
}

const JourneyProjectInfoTechList: FC<JourneyProjectInfoTechListProps> = ({ children }) => {
    return (
        <ul className="m-0 mb-3.5 flex list-none flex-wrap gap-1.75 p-0 lg:mb-5.5">
            {children}
        </ul>
    );
};

JourneyProjectInfoTechList.displayName = "JourneyProjectInfoTechList";

export { JourneyProjectInfoTechList };
export type { JourneyProjectInfoTechListProps };

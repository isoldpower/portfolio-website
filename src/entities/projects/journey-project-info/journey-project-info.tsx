import { JourneyProjectInfoDescription } from "./info/journey-project-info-description.tsx";
import { JourneyProjectInfoDistrict } from "./info/journey-project-info-district.tsx";
import { JourneyProjectInfoTechList } from "./info/journey-project-info-tech-list.tsx";
import { JourneyProjectInfoTech } from "./info/journey-project-info-tech.tsx";
import { JourneyProjectInfoTitle } from "./info/journey-project-info-title.tsx";

import type { JourneyProjectInfoDescriptionProps } from "./info/journey-project-info-description.tsx";
import type { JourneyProjectInfoDistrictProps } from "./info/journey-project-info-district.tsx";
import type { JourneyProjectInfoTechListProps } from "./info/journey-project-info-tech-list.tsx";
import type { JourneyProjectInfoTechProps } from "./info/journey-project-info-tech.tsx";
import type { JourneyProjectInfoTitleProps } from "./info/journey-project-info-title.tsx";
import type { FC, ReactNode } from "react";


interface JourneyProjectInfoProps {
    children: ReactNode;
}

type JourneyProjectInfoObject = FC<JourneyProjectInfoProps> & {
    District: FC<JourneyProjectInfoDistrictProps>;
    Title: FC<JourneyProjectInfoTitleProps>;
    Description: FC<JourneyProjectInfoDescriptionProps>;
    TechList: FC<JourneyProjectInfoTechListProps>;
    Tech: FC<JourneyProjectInfoTechProps>;
};

const JourneyProjectInfo: JourneyProjectInfoObject = ({ children }) => {
    return (
        <div className="min-w-0">
            {children}
        </div>
    );
};

JourneyProjectInfo.District = JourneyProjectInfoDistrict;
JourneyProjectInfo.Title = JourneyProjectInfoTitle;
JourneyProjectInfo.Description = JourneyProjectInfoDescription;
JourneyProjectInfo.TechList = JourneyProjectInfoTechList;
JourneyProjectInfo.Tech = JourneyProjectInfoTech;
JourneyProjectInfo.displayName = "JourneyProjectInfo";

export { JourneyProjectInfo };
export type { JourneyProjectInfoProps };

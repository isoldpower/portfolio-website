import type { FC, ReactNode } from "react";


interface JourneyProjectInfoDistrictProps {
    children: ReactNode;
}

const JourneyProjectInfoDistrict: FC<JourneyProjectInfoDistrictProps> = ({ children }) => {
    return (
        <p className="m-0 text-2xs tracking-[2px] text-foreground/90">
            {children}
        </p>
    );
};

JourneyProjectInfoDistrict.displayName = "JourneyProjectInfoDistrict";

export { JourneyProjectInfoDistrict };
export type { JourneyProjectInfoDistrictProps };

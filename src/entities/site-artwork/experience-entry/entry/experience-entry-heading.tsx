import type { FC, ReactNode } from "react";


interface ExperienceEntryHeadingProps {
    children: ReactNode;
}

const ExperienceEntryHeading: FC<ExperienceEntryHeadingProps> = ({ children }) => {
    return (
        <h3 className="col-start-2 row-start-1 m-0 flex flex-wrap items-baseline gap-x-4 gap-y-0.5 font-sans">
            {children}
        </h3>
    );
};

ExperienceEntryHeading.displayName = "ExperienceEntryHeading";

export { ExperienceEntryHeading };
export type { ExperienceEntryHeadingProps };

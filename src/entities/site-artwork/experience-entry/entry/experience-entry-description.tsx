import type { FC, ReactNode } from "react";


interface ExperienceEntryDescriptionProps {
    children: ReactNode;
}

const ExperienceEntryDescription: FC<ExperienceEntryDescriptionProps> = ({ children }) => {
    return (
        <p className="col-start-2 row-start-2 m-0 mt-1 leading-[1.6]">
            {children}
        </p>
    );
};

ExperienceEntryDescription.displayName = "ExperienceEntryDescription";

export { ExperienceEntryDescription };
export type { ExperienceEntryDescriptionProps };

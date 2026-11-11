import type { FC, ReactNode } from "react";


interface ExperienceEntryTitleProps {
    children: ReactNode;
}

const ExperienceEntryTitle: FC<ExperienceEntryTitleProps> = ({ children }) => {
    return (
        <span className="text-lg font-semibold text-accent text-shadow-soft">
            {children}
        </span>
    );
};

ExperienceEntryTitle.displayName = "ExperienceEntryTitle";

export { ExperienceEntryTitle };
export type { ExperienceEntryTitleProps };

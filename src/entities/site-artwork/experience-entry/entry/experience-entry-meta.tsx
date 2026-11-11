import type { FC, ReactNode } from "react";


interface ExperienceEntryMetaProps {
    children: ReactNode;
}

const ExperienceEntryMeta: FC<ExperienceEntryMetaProps> = ({ children }) => {
    return (
        <span className="text-base text-foreground">
            {children}
        </span>
    );
};

ExperienceEntryMeta.displayName = "ExperienceEntryMeta";

export { ExperienceEntryMeta };
export type { ExperienceEntryMetaProps };

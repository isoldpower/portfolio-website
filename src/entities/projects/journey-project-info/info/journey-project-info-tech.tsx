import type { FC, ReactNode } from "react";


interface JourneyProjectInfoTechProps {
    children: ReactNode;
}

const JourneyProjectInfoTech: FC<JourneyProjectInfoTechProps> = ({ children }) => {
    return (
        <li className="border border-accent/35 bg-background px-2 py-1.25 text-2xs">
            {children}
        </li>
    );
};

JourneyProjectInfoTech.displayName = "JourneyProjectInfoTech";

export { JourneyProjectInfoTech };
export type { JourneyProjectInfoTechProps };

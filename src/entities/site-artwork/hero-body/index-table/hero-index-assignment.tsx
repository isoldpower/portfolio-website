import type { FC, ReactNode } from "react";


interface HeroIndexAssignmentProps {
    name: string;
    children: ReactNode;
}

const HeroIndexAssignment: FC<HeroIndexAssignmentProps> = ({ name, children }) => {
    return (
        <>
            <span className="w-18 shrink-0 text-accent max-xs:w-14">{name}</span>
            <span className="w-5.5 shrink-0 max-xs:w-4">=</span>
            {children}
        </>
    );
};

HeroIndexAssignment.displayName = "HeroIndexAssignment";

export { HeroIndexAssignment };
export type { HeroIndexAssignmentProps };

import type { ReactNode } from "react";


interface HeroIndexAssignmentProps {
    name: string;
    children: ReactNode;
}

function HeroIndexAssignment({
    name,
    children
}: HeroIndexAssignmentProps) {
    return (
        <>
            <span className="w-[72px] shrink-0 text-accent">{name}</span>
            <span className="w-[22px] shrink-0">=</span>
            {children}
        </>
    );
}

export { HeroIndexAssignment };
export type { HeroIndexAssignmentProps };

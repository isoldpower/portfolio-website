import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface HeroIndexAssignmentProps {
    name: string;
    children: ReactNode;
}

const HeroIndexAssignment: FC<HeroIndexAssignmentProps> = ({ name, children }) => {
    return (
        <>
            <Text tone="accent" className="w-18 shrink-0 max-xs:w-14">{name}</Text>
            <PlainText className="w-5.5 shrink-0 max-xs:w-4">=</PlainText>
            {children}
        </>
    );
};

HeroIndexAssignment.displayName = "HeroIndexAssignment";

export { HeroIndexAssignment };
export type { HeroIndexAssignmentProps };

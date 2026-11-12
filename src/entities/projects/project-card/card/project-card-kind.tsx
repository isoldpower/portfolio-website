import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectCardKindProps {
    children: ReactNode;
}

const ProjectCardKind: FC<ProjectCardKindProps> = ({ children }) => {
    return (
        <Text
            as="p"
            family="mono"
            size="2xs"
            uppercase
            className="m-0 h-[1lh] truncate tracking-[2px] text-foreground/80"
        >
            {children}
        </Text>
    );
};

ProjectCardKind.displayName = "ProjectCardKind";

export { ProjectCardKind };
export type { ProjectCardKindProps };

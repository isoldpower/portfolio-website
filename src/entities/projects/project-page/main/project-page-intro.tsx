import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectPageIntroProps {
    children: ReactNode;
}

const ProjectPageIntro: FC<ProjectPageIntroProps> = ({ children }) => {
    return (
        <Text
            as="p"
            family="mono"
            size="md"
            weight="semibold"
            tone="accent"
            className="m-0 border-b border-accent px-5 py-5 leading-snug lg:px-6 lg:text-base"
        >
            {children}
        </Text>
    );
};

ProjectPageIntro.displayName = "ProjectPageIntro";

export { ProjectPageIntro };
export type { ProjectPageIntroProps };

import { PlainText, Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectFrameLoaderStageProps {
    values?: Record<string, string | number>;
    children: ReactNode;
}

const ProjectFrameLoaderStage: FC<ProjectFrameLoaderStageProps> = ({ values, children }) => {
    return (
        <Text tone="subtle">
            <PlainText aria-hidden="true">{"> "}</PlainText>
            <PlainText values={values}>{children}</PlainText>
        </Text>
    );
};

ProjectFrameLoaderStage.displayName = "ProjectFrameLoaderStage";

export { ProjectFrameLoaderStage };
export type { ProjectFrameLoaderStageProps };

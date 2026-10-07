import { useId } from "react";
import { WebProjectFrame } from "@widgets/project/web-project-frame";

import type { FC } from "react";
import type { WebProject } from "@entities/project/model";


interface ShowcaseWebProjectProps {
    project: WebProject;
}

const ShowcaseWebProject: FC<ShowcaseWebProjectProps> = ({
    project
}) => {
    const demoId = useId();

    return (
        <WebProjectFrame
            projectSource={project.deployUrl}
            description={project.summary ?? 'Anonymous project frame'}
            integratedProps={{ portfolioDemoId: demoId }}
        />
    );
}

export { ShowcaseWebProject };

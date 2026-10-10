import { useMemo } from "react";

import { WebProjectFrame } from "@widgets/project/web-project-frame";
import { DEMO_SESSION_FRAME_PARAM, useDemoContext } from "@features/integration/web-demo-context";

import type { FC } from "react";
import type { WebProject } from "@entities/project/model";


interface ShowcaseWebProjectProps {
    project: WebProject;
}

const ShowcaseWebProject: FC<ShowcaseWebProjectProps> = ({
    project
}) => {
    const { demoSession } = useDemoContext();
    const integratedProps = useMemo(() => ({
        [DEMO_SESSION_FRAME_PARAM]: demoSession ?? "",
    }), [demoSession]);

    return (
        <WebProjectFrame
            projectSource={project.deployUrl}
            description={project.summary ?? 'Anonymous project frame'}
            integratedProps={integratedProps}
            deferred={demoSession === null}
        />
    );
}

export { ShowcaseWebProject };

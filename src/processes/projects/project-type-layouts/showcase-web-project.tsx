import { useMemo } from "react";

import { WebProjectFrame } from "@widgets/projects/web-project-frame";
import { DEMO_SESSION_FRAME_PARAM, useDemoContext } from "@features/integrations/web-demo-context";

import type { FC } from "react";
import type { WebProject } from "@entities/projects/model";


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

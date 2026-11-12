import { useMemo } from "react";
import { ProjectLiveBar } from "@entities/projects/project-live-bar";
import { JourneyButtonHover } from "@features/projects/journey-animations";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { DEMO_SESSION_FRAME_PARAM, useDemoContext } from "@features/integrations/web-demo-context";
import { WebProjectFrame } from "@widgets/projects/web-project-frame";
import { AnimationComposer } from "@shared/lib/components";

import type { FC } from "react";
import type { WebProject } from "@entities/projects/model";


interface ShowcaseWebProjectProps {
    project: WebProject;
}

const ShowcaseWebProject: FC<ShowcaseWebProjectProps> = ({
    project
}) => {
    const { demoSession } = useDemoContext();
    const liveAddress = useMemo(() => {
        try {
            return new URL(project.deployUrl).host;
        } catch {
            return project.deployUrl;
        }
    }, [project.deployUrl]);
    const integratedProps = useMemo(() => ({
        [DEMO_SESSION_FRAME_PARAM]: demoSession ?? "",
    }), [demoSession]);

    return (
        <>
            <ProjectLiveBar>
                <ProjectLiveBar.Address label="_t(project.live_label)">
                    {liveAddress}
                </ProjectLiveBar.Address>
                <AnimationComposer>
                    <FocusOutline/>
                    <JourneyButtonHover/>
                    <ProjectLiveBar.Action href={project.deployUrl}>
                        _t(project.live_cta)
                    </ProjectLiveBar.Action>
                </AnimationComposer>
            </ProjectLiveBar>
            <WebProjectFrame
                projectSource={project.deployUrl}
                description={project.summary ?? 'Anonymous project frame'}
                integratedProps={integratedProps}
                deferred={demoSession === null}
            />
        </>
    );
}

export { ShowcaseWebProject };

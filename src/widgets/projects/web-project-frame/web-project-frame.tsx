import { ProjectFrame } from "@entities/integrations/project-frame";
import { LoaderFade, useFrameLoading } from "@features/integrations/frame-loading";
import { useIntegratedUrl } from "@features/integrations/integrated-frame";
import { AnimationComposer } from "@shared/lib/components";

import type { FC } from "react";


interface WebProjectFrameProps {
    projectSource: string;
    integratedProps?: object;
    description: string;
    deferred?: boolean;
}

const WebProjectFrame: FC<WebProjectFrameProps> = ({
    description,
    projectSource,
    integratedProps,
    deferred = false,
}) => {
    const sourceUrl = useIntegratedUrl({
        url: projectSource,
        params: integratedProps ?? {}
    });
    const frameSource = deferred ? undefined : sourceUrl;
    const frameLoading = useFrameLoading({ src: frameSource, address: projectSource });

    return (
        <ProjectFrame.Stage>
            <ProjectFrame
                src={frameSource}
                title={description}
                onLoad={frameLoading.handleLoad}
            />
            {!frameLoading.isSettled && (
                <AnimationComposer>
                    <LoaderFade />
                    <ProjectFrame.Loader progress={frameLoading.progress} isHidden={frameLoading.isHidden}>
                        <ProjectFrame.LoaderBar progress={frameLoading.progress} />
                        <ProjectFrame.LoaderStage values={{ host: frameLoading.host }}>
                            _t(project.frame.{frameLoading.stage})
                        </ProjectFrame.LoaderStage>
                    </ProjectFrame.Loader>
                </AnimationComposer>
            )}
        </ProjectFrame.Stage>
    );
}

export { WebProjectFrame };

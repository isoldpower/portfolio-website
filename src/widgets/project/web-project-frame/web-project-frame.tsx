import { ProjectFrame } from "@entities/integration/project-frame";
import { useIntegratedUrl } from "@features/integration/integrated-frame";

import type { FC } from "react";


interface WebProjectFrameProps {
    projectSource: string;
    integratedProps?: object;
    description: string;
}

const WebProjectFrame: FC<WebProjectFrameProps> = ({
    description,
    projectSource,
    integratedProps = {},
}) => {
    const sourceUrl = useIntegratedUrl({ url: projectSource, params: integratedProps });

    return (
        <ProjectFrame
            src={sourceUrl}
            title={description}
        />
    );
}

export { WebProjectFrame };
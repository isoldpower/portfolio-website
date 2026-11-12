import { cn } from "@shared/lib/utilities";
import { ProjectFrameStage } from "./layout/project-frame-stage.tsx";
import { ProjectFrameLoaderBar } from "./loader/project-frame-loader-bar.tsx";
import { ProjectFrameLoaderStage } from "./loader/project-frame-loader-stage.tsx";
import { ProjectFrameLoader } from "./loader/project-frame-loader.tsx";

import type { ProjectFrameStageProps } from "./layout/project-frame-stage.tsx";
import type { ProjectFrameLoaderBarProps } from "./loader/project-frame-loader-bar.tsx";
import type { ProjectFrameLoaderStageProps } from "./loader/project-frame-loader-stage.tsx";
import type { ProjectFrameLoaderProps } from "./loader/project-frame-loader.tsx";
import type { FC, IframeHTMLAttributes } from "react";


type ProjectFrameProps = Omit<IframeHTMLAttributes<HTMLIFrameElement>, "width" | "height" | "className">;

type ProjectFrameObject = FC<ProjectFrameProps> & {
    Stage: FC<ProjectFrameStageProps>;
    Loader: FC<ProjectFrameLoaderProps>;
    LoaderBar: FC<ProjectFrameLoaderBarProps>;
    LoaderStage: FC<ProjectFrameLoaderStageProps>;
};

const ProjectFrame: ProjectFrameObject = (props) => {
    return (
        <iframe
            className={cn(
                "block h-[calc(100dvh-var(--spacing-header)-var(--spacing-footer)-14rem)]",
                "min-h-96 w-full border border-accent bg-background"
            )}
            {...props}
        />
    );
};

ProjectFrame.Stage = ProjectFrameStage;
ProjectFrame.Loader = ProjectFrameLoader;
ProjectFrame.LoaderBar = ProjectFrameLoaderBar;
ProjectFrame.LoaderStage = ProjectFrameLoaderStage;
ProjectFrame.displayName = "ProjectFrame";

export { ProjectFrame };
export type { ProjectFrameProps };

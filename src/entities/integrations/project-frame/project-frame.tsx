import { cn } from "@shared/lib/utilities";

import type {FC, IframeHTMLAttributes} from "react";


interface ProjectFrameProps extends Omit<
    IframeHTMLAttributes<HTMLIFrameElement>,
    'width' | 'height' | 'className'
> {}

const ProjectFrame: FC<ProjectFrameProps> = ({
    ...props
}) => {
    return (
        <iframe
            className={cn(
                "block h-[calc(100dvh-var(--spacing-header)-var(--spacing-footer)-14rem)]",
                "min-h-96 w-full border border-accent bg-background"
            )}
            {...props}
        />
    );
}

export { ProjectFrame };
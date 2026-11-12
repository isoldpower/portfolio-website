import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { ButtonHTMLAttributes, FC } from "react";


type ProjectBrowserResetProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">;

const ProjectBrowserReset: FC<ProjectBrowserResetProps> = ({ className, children, ...props }) => {
    return (
        <button
            type="button"
            className={cn(
                "h-11 cursor-pointer border-none bg-transparent px-1 text-left",
                "disabled:cursor-default disabled:opacity-40",
                className
            )}
            {...props}
        >
            <Text family="mono" size="sm" tone="highlight">{children}</Text>
        </button>
    );
};

ProjectBrowserReset.displayName = "ProjectBrowserReset";

export { ProjectBrowserReset };
export type { ProjectBrowserResetProps };

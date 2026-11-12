import { cn } from "@shared/lib/utilities";
import { PlainText } from "@shared/ui-toolkit/typography";

import type { ButtonHTMLAttributes, FC } from "react";


type ProjectBrowserPageButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
    isCurrent?: boolean;
};

const ProjectBrowserPageButton: FC<ProjectBrowserPageButtonProps> = ({
    isCurrent = false,
    className,
    children,
    ...props
}) => {
    return (
        <button
            type="button"
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
                "h-9 min-w-9 cursor-pointer border border-accent bg-background px-2.5 font-mono text-sm text-accent",
                "disabled:cursor-default disabled:opacity-35",
                isCurrent && "bg-accent/15 text-highlight",
                className
            )}
            {...props}
        >
            <PlainText>{children}</PlainText>
        </button>
    );
};

ProjectBrowserPageButton.displayName = "ProjectBrowserPageButton";

export { ProjectBrowserPageButton };
export type { ProjectBrowserPageButtonProps };

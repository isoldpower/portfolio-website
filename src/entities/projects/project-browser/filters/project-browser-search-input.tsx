import { cn } from "@shared/lib/utilities";

import { FILTER_CONTROL_CLASS } from "./constants.ts";

import type { FC, InputHTMLAttributes } from "react";


type ProjectBrowserSearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const ProjectBrowserSearchInput: FC<ProjectBrowserSearchInputProps> = ({ className, ...props }) => {
    return (
        <input
            type="search"
            autoComplete="off"
            className={cn(FILTER_CONTROL_CLASS, "placeholder:text-accent/45", className)}
            {...props}
        />
    );
};

ProjectBrowserSearchInput.displayName = "ProjectBrowserSearchInput";

export { ProjectBrowserSearchInput };
export type { ProjectBrowserSearchInputProps };

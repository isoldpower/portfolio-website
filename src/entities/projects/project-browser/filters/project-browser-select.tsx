import { cn } from "@shared/lib/utilities";

import { FILTER_CONTROL_CLASS } from "./constants.ts";

import type { FC, SelectHTMLAttributes } from "react";


type ProjectBrowserSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const SELECT_ARROW_CLASS = [
    "bg-[linear-gradient(45deg,transparent_50%,#6699ff_50%),linear-gradient(135deg,#6699ff_50%,transparent_50%)]",
    "bg-size-[5px_5px,5px_5px] bg-position-[calc(100%-18px)_50%,calc(100%-13px)_50%] bg-no-repeat",
].join(" ");

const ProjectBrowserSelect: FC<ProjectBrowserSelectProps> = ({ className, ...props }) => {
    return (
        <select
            className={cn(
                FILTER_CONTROL_CLASS,
                "cursor-pointer appearance-none pr-9",
                SELECT_ARROW_CLASS,
                className
            )}
            {...props}
        />
    );
};

ProjectBrowserSelect.displayName = "ProjectBrowserSelect";

export { ProjectBrowserSelect };
export type { ProjectBrowserSelectProps };

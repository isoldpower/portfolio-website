import { cn } from "@shared/lib/utilities";
import { ExperienceTreeGroup } from "./tree/experience-tree-group.tsx";

import type { ExperienceTreeGroupProps } from "./tree/experience-tree-group.tsx";
import type { FC, HTMLAttributes } from "react";


type ExperienceTreeProps = HTMLAttributes<HTMLDivElement>;

type ExperienceTreeObject = FC<ExperienceTreeProps> & {
    Group: FC<ExperienceTreeGroupProps>;
};

const ExperienceTree: ExperienceTreeObject = ({ className, ...props }) => {
    return (
        <div
            className={cn("col-span-12 flex flex-col gap-7 self-start sm:col-span-8", className)}
            {...props}
        />
    );
};

ExperienceTree.Group = ExperienceTreeGroup;
ExperienceTree.displayName = "ExperienceTree";

export { ExperienceTree };
export type { ExperienceTreeProps };

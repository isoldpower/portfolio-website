import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type ExperienceBodyHeaderProps = HTMLAttributes<HTMLDivElement>;

const ExperienceBodyHeader: FC<ExperienceBodyHeaderProps> = ({ className, ...props }) => {
    return (
        <div className={cn("col-span-12", className)} {...props} />
    );
};

ExperienceBodyHeader.displayName = "ExperienceBodyHeader";

export { ExperienceBodyHeader };
export type { ExperienceBodyHeaderProps };

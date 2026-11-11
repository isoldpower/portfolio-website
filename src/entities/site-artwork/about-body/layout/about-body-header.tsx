import { cn } from "@shared/lib/utilities";

import type { FC, HTMLAttributes } from "react";


type AboutBodyHeaderProps = HTMLAttributes<HTMLDivElement>;

const AboutBodyHeader: FC<AboutBodyHeaderProps> = ({ className, ...props }) => {
    return (
        <div className={cn("col-span-12", className)} {...props} />
    );
};

AboutBodyHeader.displayName = "AboutBodyHeader";

export { AboutBodyHeader };
export type { AboutBodyHeaderProps };

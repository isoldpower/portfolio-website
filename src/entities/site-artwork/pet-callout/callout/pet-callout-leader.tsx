import { cn } from "@shared/lib/utilities";

import type { FC } from "react";


type PetCalloutLeaderProps = object;

const PetCalloutLeader: FC<PetCalloutLeaderProps> = () => {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "absolute top-[17%] left-[9%] h-[12.5%] w-[7%] border-b border-l border-dashed border-accent/70",
                "after:absolute after:-right-0.75 after:-bottom-0.75 after:size-1.5 after:bg-highlight",
                "after:shadow-[0_0_6px_#6699ff]"
            )}
        />
    );
};

PetCalloutLeader.displayName = "PetCalloutLeader";

export { PetCalloutLeader };
export type { PetCalloutLeaderProps };

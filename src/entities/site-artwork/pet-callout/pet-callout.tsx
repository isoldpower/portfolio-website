import { cn } from "@shared/lib/utilities";

import { PetCalloutLabel } from "./callout/pet-callout-label.tsx";
import { PetCalloutLeader } from "./callout/pet-callout-leader.tsx";

import type { PetCalloutLabelProps } from "./callout/pet-callout-label.tsx";
import type { PetCalloutLeaderProps } from "./callout/pet-callout-leader.tsx";
import type { FC, HTMLAttributes } from "react";


type PetCalloutProps = HTMLAttributes<HTMLDivElement>;

type PetCalloutObject = FC<PetCalloutProps> & {
    Label: FC<PetCalloutLabelProps>;
    Leader: FC<PetCalloutLeaderProps>;
};

const PetCallout: PetCalloutObject = ({ className, ...props }) => {
    return (
        <div
            className={cn(
                "pointer-events-none absolute inset-0 hidden select-none",
                "md:block",
                className
            )}
            {...props}
        />
    );
};

PetCallout.Label = PetCalloutLabel;
PetCallout.Leader = PetCalloutLeader;
PetCallout.displayName = "PetCallout";

export { PetCallout };
export type { PetCalloutProps };

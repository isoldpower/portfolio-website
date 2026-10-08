import { cn } from "@shared/lib/utilities";
import { Overline } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface FinanceInfraLaneProps {
    title: string;
    primary: ReactNode;
    secondary?: ReactNode;
}

const FinanceInfraLane: FC<FinanceInfraLaneProps> = ({
    title,
    primary,
    secondary
}) => {
    const hasSecondary = secondary !== undefined;

    return (
        <div className="rounded-lg border border-foreground/10 bg-foreground/[0.02] p-3">
            <Overline as="h4">{title}</Overline>
            <div className={cn("mt-2 grid gap-y-2", hasSecondary ? "grid-cols-2 gap-x-12" : "grid-cols-1")}>
                <div className="flex min-w-0 flex-col gap-2">
                    {primary}
                </div>
                {hasSecondary ? (
                    <div className="flex min-w-0 flex-col gap-2">
                        {secondary}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export { FinanceInfraLane };
export type { FinanceInfraLaneProps };

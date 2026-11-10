import { Overline } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface FinanceInfraTraceSelectorRowProps {
    title: string;
    children: ReactNode;
}

const FinanceInfraTraceSelectorRow: FC<FinanceInfraTraceSelectorRowProps> = ({ title, children }) => (
    <>
        <Overline as="span">{title}</Overline>
        <div className="flex min-h-8 items-center gap-2 overflow-x-auto [contain:inline-size]">
            {children}
        </div>
    </>
);

FinanceInfraTraceSelectorRow.displayName = "FinanceInfraTraceSelectorRow";

export { FinanceInfraTraceSelectorRow };
export type { FinanceInfraTraceSelectorRowProps };

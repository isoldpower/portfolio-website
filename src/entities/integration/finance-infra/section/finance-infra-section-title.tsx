import { Overline } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface FinanceInfraSectionTitleProps {
    children: string;
}

const FinanceInfraSectionTitle: FC<FinanceInfraSectionTitleProps> = ({ children }) => (
    <Overline as="h3" tone="muted">{children}</Overline>
);

FinanceInfraSectionTitle.displayName = "FinanceInfraSectionTitle";

export { FinanceInfraSectionTitle };
export type { FinanceInfraSectionTitleProps };

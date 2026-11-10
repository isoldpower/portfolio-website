import { MetaText } from "@shared/ui-toolkit/typography";

import type { FC } from "react";


interface FinanceInfraChannelTopicNameProps {
    children: string;
}

const FinanceInfraChannelTopicName: FC<FinanceInfraChannelTopicNameProps> = ({ children }) => (
    <MetaText tone="default" className="[writing-mode:vertical-rl] whitespace-nowrap">
        {children}
    </MetaText>
);

FinanceInfraChannelTopicName.displayName = "FinanceInfraChannelTopicName";

export { FinanceInfraChannelTopicName };
export type { FinanceInfraChannelTopicNameProps };

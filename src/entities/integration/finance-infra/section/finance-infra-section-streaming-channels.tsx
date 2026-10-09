import { useFinanceInfraCanvas } from "../context/use-finance-infra-canvas.ts";

import type { FinanceTopicChannel } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraSectionStreamingChannelsProps {
    children: (channel: FinanceTopicChannel) => ReactNode;
}

const FinanceInfraSectionStreamingChannels: FC<FinanceInfraSectionStreamingChannelsProps> = ({ children }) => {
    const { layout } = useFinanceInfraCanvas();

    return layout.streaming.channels.map(children);
};

FinanceInfraSectionStreamingChannels.displayName = "FinanceInfraSectionStreamingChannels";

export { FinanceInfraSectionStreamingChannels };
export type { FinanceInfraSectionStreamingChannelsProps };

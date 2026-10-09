import { useCallback, useMemo } from "react";

import type {
    FinanceInfraChannelPlacements,
    FinanceTopicChannel,
    FinanceTopicPortSide
} from "@entities/integration/model";
import type { TopicInflowLookup } from "@entities/integration/visual-map";


interface UseTopicInflowsParams {
    channels: FinanceTopicChannel[];
    placements: FinanceInfraChannelPlacements;
}

const useTopicInflows = ({ channels, placements }: UseTopicInflowsParams): TopicInflowLookup => {
    const collectInflows = useCallback(() => {
        const inflows = new Map<string, FinanceTopicPortSide>();

        for (const channel of channels) {
            const inflow = placements.get(channel.id)?.inflow ?? "top";

            for (const topic of channel.topics) {
                inflows.set(topic.id, inflow);
            }
        }

        return inflows;
    }, [channels, placements]);

    return useMemo(() => collectInflows(), [collectInflows]);
};

export { useTopicInflows };
export type { UseTopicInflowsParams };

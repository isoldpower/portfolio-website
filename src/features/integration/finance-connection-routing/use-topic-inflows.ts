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
        return new Map(channels.flatMap((channel) => {
            const inflow: FinanceTopicPortSide = placements.get(channel.id)?.inflow ?? "top";

            return channel.topics.map((topic) => {
                return [topic.id, inflow] as const;
            });
        }));
    }, [channels, placements]);

    return useMemo(() => {
        return collectInflows();
    }, [collectInflows]);
};

export { useTopicInflows };
export type { UseTopicInflowsParams };

import { useCallback, useMemo } from "react";

import type { ChannelConsumers } from "./types.ts";
import type { FinanceTopicChannel, FinanceTopologyConnection } from "@entities/integration/model";


interface UseChannelConsumersParams {
    channels: FinanceTopicChannel[];
    connections: FinanceTopologyConnection[];
}

const useChannelConsumers = ({ channels, connections }: UseChannelConsumersParams): ChannelConsumers => {
    const consumerIdsOf = useCallback((channel: FinanceTopicChannel) => {
        const topicIds = new Set(channel.topics.map((topic) => topic.id));

        return connections
            .filter((connection) => {
                return topicIds.has(connection.from) && !topicIds.has(connection.to);
            })
            .map((connection) => connection.to);
    }, [connections]);

    const collectConsumers = useCallback(() => {
        return new Map(channels.map((channel) => {
            return [channel.id, consumerIdsOf(channel)];
        }));
    }, [channels, consumerIdsOf]);

    return useMemo(() => {
        return collectConsumers();
    }, [collectConsumers]);
};

export { useChannelConsumers };
export type { UseChannelConsumersParams };

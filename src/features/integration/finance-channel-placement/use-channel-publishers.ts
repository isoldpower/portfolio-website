import { useCallback, useMemo } from "react";

import type { ChannelPublishers } from "./types.ts";
import type { FinanceTopicChannel, FinanceTopologyConnection } from "@entities/integration/model";


interface UseChannelPublishersParams {
    channels: FinanceTopicChannel[];
    connections: FinanceTopologyConnection[];
}

const useChannelPublishers = ({ channels, connections }: UseChannelPublishersParams): ChannelPublishers => {
    const publisherIdsOf = useCallback((channel: FinanceTopicChannel) => {
        const topicIds = new Set(channel.topics.map((topic) => topic.id));

        return connections
            .filter((connection) => {
                return topicIds.has(connection.to) && !topicIds.has(connection.from);
            })
            .map((connection) => connection.from);
    }, [connections]);
    const collectPublishers = useCallback(() => {
        const publishers = new Map<string, string[]>();

        for (const channel of channels) {
            publishers.set(channel.id, publisherIdsOf(channel));
        }

        return publishers;
    }, [channels, publisherIdsOf]);

    return useMemo(() => collectPublishers(), [collectPublishers]);
};

export { useChannelPublishers };
export type { UseChannelPublishersParams };

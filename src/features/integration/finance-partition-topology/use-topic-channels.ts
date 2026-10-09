import { useCallback, useMemo } from "react";
import { AUXILIARY_TOPIC_SUFFIXES } from "./node-types.ts";

import type { FinanceTopicChannel, FinanceTopologyNode } from "@entities/integration/model";


const useTopicChannels = (topics: FinanceTopologyNode[]): FinanceTopicChannel[] => {
    const channelKeyOf = useCallback((topic: FinanceTopologyNode) => {
        const suffix = AUXILIARY_TOPIC_SUFFIXES.find((candidate) => {
            return topic.name.endsWith(candidate);
        });

        return suffix === undefined ? topic.name : topic.name.slice(0, -suffix.length);
    }, []);
    const groupChannels = useCallback(() => {
        const channels = new Map<string, FinanceTopicChannel>();

        for (const topic of topics) {
            const key = channelKeyOf(topic);
            const channel = channels.get(key) ?? { id: `channel:${key}`, title: key, topics: [] };

            channel.topics.push(topic);
            channels.set(key, channel);
        }

        return [...channels.values()];
    }, [topics, channelKeyOf]);

    return useMemo(() => groupChannels(), [groupChannels]);
};

export { useTopicChannels };

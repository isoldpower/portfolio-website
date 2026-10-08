import type { FinanceTopicChannel } from "../model/types.ts";
import type { FinanceTopologyNode } from "@entities/integration/model";


const AUXILIARY_TOPIC_SUFFIXES = [".retry", ".dlq"];

function channelKeyOf(topic: FinanceTopologyNode): string {
    for (const suffix of AUXILIARY_TOPIC_SUFFIXES) {
        if (topic.name.endsWith(suffix)) {
            return topic.name.slice(0, -suffix.length);
        }
    }

    return topic.name;
}

function channelIdOf(key: string): string {
    return `channel:${key}`;
}

function groupTopicChannels(topics: FinanceTopologyNode[]): FinanceTopicChannel[] {
    const channels = new Map<string, FinanceTopicChannel>();

    for (const topic of topics) {
        const key = channelKeyOf(topic);
        const channel = channels.get(key) ?? { id: channelIdOf(key), title: key, topics: [] };

        channel.topics.push(topic);
        channels.set(key, channel);
    }

    return [...channels.values()];
}

export { groupTopicChannels };

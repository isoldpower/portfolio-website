import { useMemo } from "react";
import { useTopicChannels } from "./use-topic-channels.ts";

import type { FinanceInfraStreamingLayout, FinanceTopologyNode } from "@entities/integration/model";


const useStreamingLayout = (nodes: FinanceTopologyNode[]): FinanceInfraStreamingLayout => {
    const topics = useMemo(() => {
        return nodes.filter((node) => {
            return node.type === "topic";
        })
    }, [nodes]);

    const channels = useTopicChannels(topics);

    return useMemo(() => ({
        channels
    }), [channels]);
};

export { useStreamingLayout };

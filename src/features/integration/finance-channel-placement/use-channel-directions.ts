import { useCallback, useMemo } from "react";

import type { ChannelConsumers, ChannelDirections, ChannelPublishers } from "./types.ts";
import type {
    FinanceTopicChannel,
    FinanceTopicDirection
} from "@entities/integration/model";
import type { AnchorLookup } from "@entities/integration/visual-map";


interface UseChannelDirectionsParams {
    channels: FinanceTopicChannel[];
    publishers: ChannelPublishers;
    consumers: ChannelConsumers;
    anchors: AnchorLookup;
}

const useChannelDirections = ({
    channels,
    publishers,
    consumers,
    anchors
}: UseChannelDirectionsParams): ChannelDirections => {
    const meanCenterOf = useCallback((nodeIds: string[]) => {
        const centers = nodeIds.flatMap((nodeId) => {
            const anchor = anchors.get(nodeId);

            return anchor === undefined ? [] : [anchor.y + anchor.height / 2];
        });

        return centers.length !== 0
            ? centers.reduce((sum, center) => sum + center, 0) / centers.length
            : undefined;
    }, [anchors]);

    const directionOf = useCallback((channel: FinanceTopicChannel): FinanceTopicDirection => {
        const publisherCenter = meanCenterOf(publishers.get(channel.id) ?? []);
        const consumerCenter = meanCenterOf(consumers.get(channel.id) ?? []);

        return (publisherCenter && consumerCenter)
            ? publisherCenter <= consumerCenter
                ? "top-to-bottom"
                : "bottom-to-top"
            : "top-to-bottom";
    }, [publishers, consumers, meanCenterOf]);

    const collectDirections = useCallback(() => {
        return new Map(channels.map((channel) => {
            return [channel.id, directionOf(channel)];
        }));
    }, [channels, directionOf]);

    return useMemo(() => {
        return collectDirections();
    }, [collectDirections]);
};

export { useChannelDirections };
export type { UseChannelDirectionsParams };

import { useCallback, useMemo } from "react";
import { STREAMING_SECTION_ANCHOR } from "@entities/integration/model";
import { CHANNEL_GAP } from "./constants.ts";
import { useChannelConsumers } from "./use-channel-consumers.ts";
import { useChannelDirections } from "./use-channel-directions.ts";
import { useChannelPublishers } from "./use-channel-publishers.ts";

import type { ChannelDraft, ChannelDrafts } from "./types.ts";
import type {
    FinanceInfraAnchor,
    FinanceInfraStreamingLayout,
    FinanceTopicChannel,
    FinanceTopicDirection,
    FinanceTopologyConnection
} from "@entities/integration/model";
import type { AnchorLookup } from "@entities/integration/visual-map";


interface UseChannelDraftsParams {
    streaming: FinanceInfraStreamingLayout;
    connections: FinanceTopologyConnection[];
    anchors: AnchorLookup;
}

const useChannelDrafts = ({ streaming, connections, anchors }: UseChannelDraftsParams): ChannelDrafts | null => {
    const publishers = useChannelPublishers({ channels: streaming.channels, connections });
    const consumers = useChannelConsumers({ channels: streaming.channels, connections });
    const directions = useChannelDirections({ channels: streaming.channels, publishers, consumers, anchors });

    const publisherAnchorsOf = useCallback((channel: FinanceTopicChannel): FinanceInfraAnchor[] => {
        const publisherIds = publishers.get(channel.id) ?? [];

        return publisherIds.flatMap((publisherId) => {
            const publisherAnchor = anchors.get(publisherId);

            return publisherAnchor === undefined ? [] : [publisherAnchor];
        });
    }, [anchors, publishers]);

    const connectionCountOf = useCallback((channel: FinanceTopicChannel): number => {
        const publisherIds = publishers.get(channel.id) ?? [];
        const consumerIds = consumers.get(channel.id) ?? [];

        return publisherIds.length + consumerIds.length;
    }, [publishers, consumers]);

    const preferredTopOf = useCallback((
        direction: FinanceTopicDirection,
        channelAnchor: FinanceInfraAnchor,
        publisherAnchors: FinanceInfraAnchor[]
    ): number | undefined => {
        if (publisherAnchors.length === 0) {
            return undefined;
        }

        if (direction === "top-to-bottom") {
            const lowestPublisherBottom = Math.max(...publisherAnchors.map((publisherAnchor) => {
                return publisherAnchor.y + publisherAnchor.height;
            }));

            return lowestPublisherBottom + CHANNEL_GAP;
        }

        const highestPublisherTop = Math.min(...publisherAnchors.map((publisherAnchor) => {
            return publisherAnchor.y;
        }));

        return highestPublisherTop - CHANNEL_GAP - channelAnchor.height;
    }, []);

    const draftOf = useCallback((
        channel: FinanceTopicChannel,
        sectionAnchor: FinanceInfraAnchor
    ): ChannelDraft | null => {
        const channelAnchor = anchors.get(channel.id);

        if (channelAnchor === undefined) {
            return null;
        }

        const direction = directions.get(channel.id) ?? "top-to-bottom";
        const preferredTop = preferredTopOf(
            direction,
            channelAnchor,
            publisherAnchorsOf(channel),
        );

        return {
            channelId: channel.id,
            top: Math.max(sectionAnchor.y, preferredTop ?? sectionAnchor.y),
            width: channelAnchor.width,
            height: channelAnchor.height,
            direction,
            connectionCount: connectionCountOf(channel),
        };
    }, [anchors, directions, preferredTopOf, publisherAnchorsOf, connectionCountOf]);

    const collectDrafts = useCallback((): ChannelDrafts | null => {
        const sectionAnchor = anchors.get(STREAMING_SECTION_ANCHOR);

        if (sectionAnchor === undefined) {
            return null;
        } else {
            return {
                sectionTop: sectionAnchor.y,
                channels: streaming.channels.flatMap((channel) => {
                    const draft = draftOf(channel, sectionAnchor);

                    return draft === null ? [] : [draft];
                }),
            };
        }
    }, [anchors, streaming.channels, draftOf]);

    return useMemo(() => {
        return collectDrafts();
    }, [collectDrafts]);
};

export { useChannelDrafts };
export type { UseChannelDraftsParams };

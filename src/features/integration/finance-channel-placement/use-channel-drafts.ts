import { useCallback, useMemo } from "react";
import { STREAMING_SECTION_ANCHOR } from "@entities/integration/model";
import { CHANNEL_GAP } from "./constants.ts";
import { useChannelPublishers } from "./use-channel-publishers.ts";

import type { ChannelDraft, ChannelDrafts } from "./types.ts";
import type {
    FinanceInfraAnchor,
    FinanceInfraStreamingLayout,
    FinanceTopicChannel,
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
    const connectorIds = useMemo(() => {
        return new Set(streaming.connectors.map((connector) => connector.id));
    }, [streaming.connectors]);

    const draftOf = useCallback((channel: FinanceTopicChannel, section: FinanceInfraAnchor): ChannelDraft | null => {
        const size = anchors.get(channel.id);

        if (size === undefined) {
            return null;
        }

        const publisherAnchors = (publishers.get(channel.id) ?? []).flatMap((publisherId) => {
            const publisher = anchors.get(publisherId);

            return publisher === undefined ? [] : [{ publisherId, publisher }];
        });
        const connectorBottoms = publisherAnchors
            .filter(({ publisherId }) => connectorIds.has(publisherId))
            .map(({ publisher }) => publisher.y + publisher.height);
        const serviceTops = publisherAnchors
            .filter(({ publisherId }) => !connectorIds.has(publisherId))
            .map(({ publisher }) => publisher.y);

        if (connectorBottoms.length > 0) {
            return {
                channelId: channel.id,
                top: Math.max(...connectorBottoms) + CHANNEL_GAP,
                width: size.width,
                height: size.height,
                inflow: "top",
            };
        }

        const publisherTop = serviceTops.length > 0
            ? Math.min(...serviceTops)
            : section.y + size.height;

        return {
            channelId: channel.id,
            top: Math.max(section.y, publisherTop - CHANNEL_GAP - size.height),
            width: size.width,
            height: size.height,
            inflow: "bottom",
        };
    }, [anchors, publishers, connectorIds]);
    const collectDrafts = useCallback((): ChannelDrafts | null => {
        const section = anchors.get(STREAMING_SECTION_ANCHOR);

        if (section === undefined) {
            return null;
        }

        const drafts: ChannelDrafts = { sectionTop: section.y, shared: [], dedicated: [] };

        for (const channel of streaming.channels) {
            const draft = draftOf(channel, section);

            if (draft !== null) {
                (draft.inflow === "top" ? drafts.dedicated : drafts.shared).push(draft);
            }
        }

        return drafts;
    }, [anchors, streaming.channels, draftOf]);

    return useMemo(() => collectDrafts(), [collectDrafts]);
};

export { useChannelDrafts };
export type { UseChannelDraftsParams };

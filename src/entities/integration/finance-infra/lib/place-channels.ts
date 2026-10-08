import type {
    FinanceChannelPlacement,
    FinanceInfraAnchor,
    FinanceTopicChannel,
    FinanceTopicPortSide
} from "../model/types.ts";
import type { FinanceTopologyConnection } from "@entities/integration/model";


const CHANNEL_GAP = 16;
const COLUMN_GAP = 6;

interface ChannelPlacementInput {
    channels: FinanceTopicChannel[];
    connections: FinanceTopologyConnection[];
    anchors: ReadonlyMap<string, FinanceInfraAnchor>;
    sectionAnchorId: string;
    connectorIds: ReadonlySet<string>;
}

interface ChannelDraft {
    channelId: string;
    top: number;
    width: number;
    height: number;
    inflow: FinanceTopicPortSide;
    isDedicated: boolean;
}

interface ChannelColumn {
    drafts: ChannelDraft[];
    bottom: number;
    width: number;
}

function topicIdsOf(channel: FinanceTopicChannel): Set<string> {
    const ids = new Set<string>();

    for (const topic of channel.topics) {
        ids.add(topic.id);
    }

    return ids;
}

function publisherIdsOf(channel: FinanceTopicChannel, connections: FinanceTopologyConnection[]): string[] {
    const topicIds = topicIdsOf(channel);
    const publisherIds: string[] = [];

    for (const connection of connections) {
        if (topicIds.has(connection.to) && !topicIds.has(connection.from)) {
            publisherIds.push(connection.from);
        }
    }

    return publisherIds;
}

function draftOf(
    channel: FinanceTopicChannel,
    input: ChannelPlacementInput,
    section: FinanceInfraAnchor
): ChannelDraft | null {
    const size = input.anchors.get(channel.id);

    if (size === undefined) {
        return null;
    }

    let connectorBottom: number | null = null;
    let publisherTop: number | null = null;

    for (const publisherId of publisherIdsOf(channel, input.connections)) {
        const publisher = input.anchors.get(publisherId);

        if (publisher === undefined) {
            continue;
        }

        if (input.connectorIds.has(publisherId)) {
            connectorBottom = Math.max(connectorBottom ?? -Infinity, publisher.y + publisher.height);
        } else {
            publisherTop = Math.min(publisherTop ?? Infinity, publisher.y);
        }
    }

    if (connectorBottom !== null) {
        return {
            channelId: channel.id,
            top: connectorBottom + CHANNEL_GAP,
            width: size.width,
            height: size.height,
            inflow: "top",
            isDedicated: true,
        };
    }

    return {
        channelId: channel.id,
        top: Math.max(section.y, (publisherTop ?? section.y + size.height) - CHANNEL_GAP - size.height),
        width: size.width,
        height: size.height,
        inflow: "bottom",
        isDedicated: false,
    };
}

function compareDraftTops(left: ChannelDraft, right: ChannelDraft): number {
    return left.top - right.top;
}

function packColumns(drafts: ChannelDraft[]): ChannelColumn[] {
    const columns: ChannelColumn[] = [];

    for (const draft of drafts.sort(compareDraftTops)) {
        let column = columns.find(fitsBelow.bind(null, draft));

        if (column === undefined) {
            column = { drafts: [], bottom: -Infinity, width: 0 };
            columns.push(column);
        }

        column.drafts.push(draft);
        column.bottom = draft.top + draft.height;
        column.width = Math.max(column.width, draft.width);
    }

    return columns;
}

function fitsBelow(draft: ChannelDraft, column: ChannelColumn): boolean {
    return column.bottom + CHANNEL_GAP <= draft.top;
}

function placeChannels(input: ChannelPlacementInput): Map<string, FinanceChannelPlacement> {
    const placements = new Map<string, FinanceChannelPlacement>();
    const section = input.anchors.get(input.sectionAnchorId);

    if (section === undefined) {
        return placements;
    }

    const shared: ChannelDraft[] = [];
    const dedicated: ChannelDraft[] = [];

    for (const channel of input.channels) {
        const draft = draftOf(channel, input, section);

        if (draft !== null) {
            (draft.isDedicated ? dedicated : shared).push(draft);
        }
    }

    let offsetX = 0;

    for (const column of [...packColumns(shared), ...packColumns(dedicated)]) {
        for (const draft of column.drafts) {
            placements.set(draft.channelId, {
                x: offsetX,
                y: draft.top - section.y,
                inflow: draft.inflow,
            });
        }

        offsetX += column.width + COLUMN_GAP;
    }

    return placements;
}

export { placeChannels };
export type { ChannelPlacementInput };

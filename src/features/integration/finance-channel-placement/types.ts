import type { FinanceTopicDirection } from "@entities/integration/model";


interface ChannelDraft {
    channelId: string;
    top: number;
    width: number;
    height: number;
    direction: FinanceTopicDirection;
    connectionCount: number;
}

interface ChannelDrafts {
    sectionTop: number;
    channels: ChannelDraft[];
}

interface ChannelColumn {
    drafts: ChannelDraft[];
    bottom: number;
    width: number;
}

type ChannelPublishers = ReadonlyMap<string, string[]>;
type ChannelConsumers = ReadonlyMap<string, string[]>;
type ChannelDirections = ReadonlyMap<string, FinanceTopicDirection>;


export type { ChannelDraft, ChannelDrafts, ChannelColumn, ChannelPublishers, ChannelConsumers, ChannelDirections };

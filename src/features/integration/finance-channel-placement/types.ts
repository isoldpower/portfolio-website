import type { FinanceTopicPortSide } from "@entities/integration/model";


interface ChannelDraft {
    channelId: string;
    top: number;
    width: number;
    height: number;
    inflow: FinanceTopicPortSide;
}

interface ChannelDrafts {
    sectionTop: number;
    shared: ChannelDraft[];
    dedicated: ChannelDraft[];
}

interface ChannelColumn {
    drafts: ChannelDraft[];
    bottom: number;
    width: number;
}

type ChannelPublishers = ReadonlyMap<string, string[]>;

export type { ChannelDraft, ChannelDrafts, ChannelColumn, ChannelPublishers };

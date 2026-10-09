import type {
    FinanceInfraLaneLayout,
    FinanceTopicChannel,
    FinanceTopologyNode,
} from "@entities/integration/model";
import type { FC } from "react";


interface NodeRendererProps {
    node: FinanceTopologyNode;
}

type NodeRenderer = FC<NodeRendererProps>;

interface LaneRendererProps {
    lane: FinanceInfraLaneLayout;
}

type LaneRenderer = FC<LaneRendererProps>;

interface ChannelRendererProps {
    channel: FinanceTopicChannel;
    centered?: boolean;
}

type ChannelRenderer = FC<ChannelRendererProps>;

export type {
    NodeRendererProps,
    NodeRenderer,
    LaneRendererProps,
    LaneRenderer,
    ChannelRenderer,
    ChannelRendererProps
};
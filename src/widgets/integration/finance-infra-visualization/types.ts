import type {
    FinanceInfraLaneLayout,
    FinanceInfraRoutedConnection,
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

interface EdgeRendererProps {
    connection: FinanceInfraRoutedConnection;
}

type EdgeRenderer = FC<EdgeRendererProps>;

interface TraceDrawerRendererProps {
    isHidden: boolean;
    onReveal: () => void;
}

type TraceDrawerRenderer = FC<TraceDrawerRendererProps>;

export type {
    EdgeRendererProps,
    EdgeRenderer,
    TraceDrawerRendererProps,
    TraceDrawerRenderer,
    NodeRendererProps,
    NodeRenderer,
    LaneRendererProps,
    LaneRenderer,
    ChannelRenderer,
    ChannelRendererProps
};
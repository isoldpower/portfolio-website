import { useId, useLayoutEffect, useMemo, useState } from "react";

import {
    FinanceInfraEdge,
    FinanceInfraEdgeLayer,
    FinanceInfraLane,
    FinanceInfraNode,
    FinanceInfraSection,
    FinanceInfraShell,
    FinanceInfraTopic,
    FinanceInfraTopicChannel,
    partitionTopology,
    placeChannels,
    routeConnection
} from "@entities/integration/finance-infra";

import { connectionEmphasisOf, focusOf, nodeEmphasisOf } from "../lib/connection-focus.ts";
import { useNodeAnchors } from "../lib/use-node-anchors.ts";

import type { ConnectionFocus } from "../lib/connection-focus.ts";
import type { NodeAnchorRegistry } from "../lib/NodeAnchorRegistry.ts";
import type {
    AnchorLookup,
    FinanceChannelPlacement,
    FinanceInfraLaneLayout,
    FinanceTopicChannel,
    FinanceTopicPortSide,
    TopicInflowLookup
} from "@entities/integration/finance-infra";
import type { FinanceTopology, FinanceTopologyConnection, FinanceTopologyNode } from "@entities/integration/model";
import type { FC } from "react";


const STREAMING_SECTION_ANCHOR = "section:streaming";

interface CanvasContext {
    registry: NodeAnchorRegistry;
    focus: ConnectionFocus | null;
    onFocusChange: (nodeId: string | null) => void;
}

interface RoutedConnection {
    key: string;
    connection: FinanceTopologyConnection;
    path: string;
}

type ChannelPlacements = ReadonlyMap<string, FinanceChannelPlacement>;

interface FinanceInfraCanvasProps {
    topology: FinanceTopology;
}

function connectionKeyOf(connection: FinanceTopologyConnection): string {
    return `${connection.from}->${connection.to}:${connection.kind}`;
}

function topicInflowsOf(channels: FinanceTopicChannel[], placements: ChannelPlacements): TopicInflowLookup {
    const inflows = new Map<string, FinanceTopicPortSide>();

    for (const channel of channels) {
        const placement = placements.get(channel.id);

        for (const topic of channel.topics) {
            inflows.set(topic.id, placement?.inflow ?? "top");
        }
    }

    return inflows;
}

function routeConnections(
    connections: FinanceTopologyConnection[],
    anchors: AnchorLookup,
    topicInflows: TopicInflowLookup
): RoutedConnection[] {
    const routed: RoutedConnection[] = [];

    for (const connection of connections) {
        const path = routeConnection(connection, anchors, topicInflows);

        if (path !== null) {
            routed.push({ key: connectionKeyOf(connection), connection, path });
        }
    }

    return routed;
}

function idsOf(nodes: FinanceTopologyNode[]): Set<string> {
    const ids = new Set<string>();

    for (const node of nodes) {
        ids.add(node.id);
    }

    return ids;
}

function markerPrefixOf(id: string): string {
    return `finance-infra-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

function renderNode(context: CanvasContext, node: FinanceTopologyNode) {
    return (
        <FinanceInfraNode
            key={node.id}
            node={node}
            ref={context.registry.refFor(node.id)}
            emphasis={nodeEmphasisOf(context.focus, node.id)}
            onPointerEnter={context.onFocusChange.bind(null, node.id)}
            onPointerLeave={context.onFocusChange.bind(null, null)}
            onFocus={context.onFocusChange.bind(null, node.id)}
            onBlur={context.onFocusChange.bind(null, null)}
        />
    );
}

function renderTopic(context: CanvasContext, topic: FinanceTopologyNode) {
    return (
        <FinanceInfraTopic
            key={topic.id}
            topic={topic}
            ref={context.registry.refFor(topic.id)}
            emphasis={nodeEmphasisOf(context.focus, topic.id)}
            onPointerEnter={context.onFocusChange.bind(null, topic.id)}
            onPointerLeave={context.onFocusChange.bind(null, null)}
            onFocus={context.onFocusChange.bind(null, topic.id)}
            onBlur={context.onFocusChange.bind(null, null)}
        />
    );
}

function renderChannel(context: CanvasContext, placements: ChannelPlacements, channel: FinanceTopicChannel) {
    return (
        <FinanceInfraTopicChannel
            key={channel.id}
            title={channel.title}
            placement={placements.get(channel.id)}
            ref={context.registry.refFor(channel.id)}
        >
            {channel.topics.map(renderTopic.bind(null, context))}
        </FinanceInfraTopicChannel>
    );
}

function renderLane(context: CanvasContext, lane: FinanceInfraLaneLayout) {
    return (
        <FinanceInfraLane
            key={lane.id}
            title={lane.title}
            primary={lane.primary.map(renderNode.bind(null, context))}
            secondary={lane.secondary.map(renderNode.bind(null, context))}
        />
    );
}

function renderConnection(markerPrefix: string, focus: ConnectionFocus | null, routed: RoutedConnection) {
    return (
        <FinanceInfraEdge
            key={routed.key}
            path={routed.path}
            kind={routed.connection.kind}
            markerPrefix={markerPrefix}
            emphasis={connectionEmphasisOf(focus, routed.connection)}
        />
    );
}

const FinanceInfraCanvas: FC<FinanceInfraCanvasProps> = ({
    topology
}) => {
    const markerPrefix = markerPrefixOf(useId());
    const { registry, anchors } = useNodeAnchors();
    const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

    const layout = useMemo(() => partitionTopology(topology), [topology]);
    const connectorIds = useMemo(() => idsOf(layout.streaming.connectors), [layout]);
    const focus = useMemo(() => focusOf(topology.connections, focusedNodeId), [topology.connections, focusedNodeId]);
    const placements = useMemo(() => placeChannels({
        channels: layout.streaming.channels,
        connections: topology.connections,
        anchors,
        sectionAnchorId: STREAMING_SECTION_ANCHOR,
        connectorIds,
    }), [layout, topology.connections, anchors, connectorIds]);
    const routedConnections = useMemo(
        () => routeConnections(topology.connections, anchors, topicInflowsOf(layout.streaming.channels, placements)),
        [topology.connections, anchors, layout, placements]
    );

    useLayoutEffect(() => {
        registry.remeasure();
    }, [registry, placements]);

    const context: CanvasContext = { registry, focus, onFocusChange: setFocusedNodeId };

    return (
        <FinanceInfraShell
            ref={registry.containerRef}
            overlay={(
                <FinanceInfraEdgeLayer markerPrefix={markerPrefix}>
                    {routedConnections.map(renderConnection.bind(null, markerPrefix, focus))}
                </FinanceInfraEdgeLayer>
            )}
            client={(
                <FinanceInfraSection title="Client">
                    {layout.client.map(renderNode.bind(null, context))}
                </FinanceInfraSection>
            )}
            core={(
                <FinanceInfraSection title="Services & storage">
                    {layout.core.map(renderLane.bind(null, context))}
                </FinanceInfraSection>
            )}
            streaming={(
                <FinanceInfraSection
                    title="Kafka"
                    ref={context.registry.refFor(STREAMING_SECTION_ANCHOR)}
                    className="relative h-full"
                >
                    {layout.streaming.connectors.map(renderNode.bind(null, context))}
                    {layout.streaming.channels.map(renderChannel.bind(null, context, placements))}
                </FinanceInfraSection>
            )}
        />
    );
};

export { FinanceInfraCanvas };
export type { FinanceInfraCanvasProps };

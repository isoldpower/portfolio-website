import { groupTopicChannels } from "./topic-channels.ts";

import type {
    FinanceInfraLaneLayout,
    FinanceInfraLayout,
    FinanceInfraSectionId,
    FinanceInfraStreamingLayout
} from "../model/types.ts";
import type { FinanceNodeType, FinanceTopology, FinanceTopologyNode } from "@entities/integration/model";


const STORAGE_TYPES: ReadonlySet<FinanceNodeType> = new Set(["database", "cache", "ledger", "search"]);

const STREAMING_TYPES: ReadonlySet<FinanceNodeType> = new Set(["topic", "connector"]);

function sectionOf(node: FinanceTopologyNode): FinanceInfraSectionId {
    if (node.deployment === "client") {
        return "client";
    }

    return STREAMING_TYPES.has(node.type) ? "streaming" : "core";
}

function isStorage(node: FinanceTopologyNode): boolean {
    return STORAGE_TYPES.has(node.type);
}

function isConnector(node: FinanceTopologyNode): boolean {
    return node.type === "connector";
}

function isTopic(node: FinanceTopologyNode): boolean {
    return node.type === "topic";
}

function nodesByGroupOf(nodes: FinanceTopologyNode[]): Map<string, FinanceTopologyNode[]> {
    const nodesByGroup = new Map<string, FinanceTopologyNode[]>();

    for (const node of nodes) {
        const groupNodes = nodesByGroup.get(node.groupId) ?? [];

        groupNodes.push(node);
        nodesByGroup.set(node.groupId, groupNodes);
    }

    return nodesByGroup;
}

function coreLanesOf(topology: FinanceTopology, coreNodes: FinanceTopologyNode[]): FinanceInfraLaneLayout[] {
    const nodesByGroup = nodesByGroupOf(coreNodes);
    const lanes: FinanceInfraLaneLayout[] = [];

    for (const group of topology.groups) {
        const groupNodes = nodesByGroup.get(group.id);

        if (groupNodes === undefined) {
            continue;
        }

        lanes.push({
            id: group.id,
            title: group.name,
            primary: groupNodes.filter(isComputeNode),
            secondary: groupNodes.filter(isStorage),
        });
    }

    return lanes;
}

function isComputeNode(node: FinanceTopologyNode): boolean {
    return !isStorage(node);
}

function streamingLayoutOf(streamingNodes: FinanceTopologyNode[]): FinanceInfraStreamingLayout {
    return {
        connectors: streamingNodes.filter(isConnector),
        channels: groupTopicChannels(streamingNodes.filter(isTopic)),
    };
}

function partitionTopology(topology: FinanceTopology): FinanceInfraLayout {
    const nodesBySection: Record<FinanceInfraSectionId, FinanceTopologyNode[]> = {
        client: [],
        core: [],
        streaming: [],
    };

    for (const node of topology.nodes) {
        nodesBySection[sectionOf(node)].push(node);
    }

    return {
        client: nodesBySection.client,
        core: coreLanesOf(topology, nodesBySection.core),
        streaming: streamingLayoutOf(nodesBySection.streaming),
    };
}

export { partitionTopology, sectionOf, isStorage };

import { useMemo } from "react";
import { useCoreLanes } from "./use-core-lanes.ts";
import { useEdgeLaneSplit } from "./use-edge-lane-split.ts";
import { useKafkaLinkedIds } from "./use-kafka-linked-ids.ts";
import { useMainTopicOrder } from "./use-main-topic-order.ts";
import { useMainTopicRoles } from "./use-main-topic-roles.ts";
import { useStreamingLayout } from "./use-streaming-layout.ts";
import { useTopologySections } from "./use-topology-sections.ts";

import type { FinanceInfraLayout, FinanceTopology } from "@entities/integration/model";


const usePartitionTopology = (topology: FinanceTopology): FinanceInfraLayout => {
    const sections = useTopologySections(topology.nodes);
    const kafkaLinkedIds = useKafkaLinkedIds({ connections: topology.connections, streaming: sections.streaming });
    const roles = useMainTopicRoles({ nodes: topology.nodes, connections: topology.connections });
    const groupedLanes = useCoreLanes({ groups: topology.groups, nodes: sections.core, kafkaLinkedIds });
    const lanes = useMainTopicOrder({ lanes: groupedLanes, roles });
    const { edge, core } = useEdgeLaneSplit(lanes);
    const streaming = useStreamingLayout(sections.streaming);

    return useMemo(() => ({
        client: sections.client,
        edge,
        core,
        streaming,
    }), [sections.client, edge, core, streaming]);
};

export { usePartitionTopology };

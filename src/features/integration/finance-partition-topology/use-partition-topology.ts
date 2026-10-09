import { useMemo } from "react";
import { useCoreLanes } from "./use-core-lanes.ts";
import { useStreamingLayout } from "./use-streaming-layout.ts";
import { useTopologySections } from "./use-topology-sections.ts";

import type { FinanceInfraLayout, FinanceTopology } from "@entities/integration/model";


const usePartitionTopology = (topology: FinanceTopology): FinanceInfraLayout => {
    const sections = useTopologySections(topology.nodes);
    const core = useCoreLanes({ groups: topology.groups, nodes: sections.core });
    const streaming = useStreamingLayout(sections.streaming);

    return useMemo(() => ({
        client: sections.client,
        core,
        streaming,
    }), [sections.client, core, streaming]);
};

export { usePartitionTopology };

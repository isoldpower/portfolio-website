import { useMemo } from "react";
import { useInstanceGroups } from "./use-instance-groups.ts";
import { useInstancedConnections } from "./use-instanced-connections.ts";
import { useInstancedNodes } from "./use-instanced-nodes.ts";
import { useRoleSplit } from "./use-role-split.ts";

import type { FinanceTopology } from "@entities/integration/model";


const useNodeInstances = (topology: FinanceTopology): FinanceTopology => {
    const instanceGroups = useInstanceGroups({
        nodes: topology.nodes,
        connections: topology.connections
    });
    const nodes = useInstancedNodes({
        nodes: topology.nodes,
        instanceGroups
    });
    const connections = useInstancedConnections({
        nodes: topology.nodes,
        connections: topology.connections,
        instanceGroups,
    });

    const instancedTopology = useMemo(() => ({
        ...topology,
        nodes,
        connections,
    }), [topology, nodes, connections]);

    return useRoleSplit(instancedTopology);
};

export { useNodeInstances };

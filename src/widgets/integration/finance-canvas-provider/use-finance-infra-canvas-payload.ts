import { useMemo } from "react";

import { useChannelPlacements } from "@features/integration/finance-channel-placement";
import { useConnectionRouting } from "@features/integration/finance-connection-routing";
import { useAnchorRemeasure, useNodeAnchors } from "@features/integration/finance-node-anchors";
import { useNodeFocus } from "@features/integration/finance-node-focus";
import { useNodeInstances } from "@features/integration/finance-node-instances";
import { usePartitionTopology } from "@features/integration/finance-partition-topology";
import { useFlowEmphasis, useRequestFlow } from "@features/integration/finance-request-flow";
import { useMarkerPrefix } from "@features/integration/finance-topology";

import type { FinanceInfraCanvasPayload, FinanceTopology } from "@entities/integration/model";


const useFinanceInfraCanvasPayload = (topology: FinanceTopology): FinanceInfraCanvasPayload => {
    const markerPrefix = useMarkerPrefix();
    const instancedTopology = useNodeInstances(topology);
    const layout = usePartitionTopology(instancedTopology);
    const { focusHandlers, ...focus } = useNodeFocus(instancedTopology.connections);
    const flow = useRequestFlow(topology);
    const emphasis = useFlowEmphasis({ focus, flow });
    const { registry, anchors } = useNodeAnchors();
    const placements = useChannelPlacements({
        streaming: layout.streaming,
        connections: instancedTopology.connections,
        anchors,
    });
    const routedConnections = useConnectionRouting({
        connections: instancedTopology.connections,
        channels: layout.streaming.channels,
        anchors,
        placements,
    });

    useAnchorRemeasure({ registry, trigger: placements });

    return useMemo<FinanceInfraCanvasPayload>(() => ({
        markerPrefix,
        layout,
        focusHandlers,
        ...emphasis,
        flow,
        registry,
        placements,
        routedConnections,
    }), [markerPrefix, layout, focusHandlers, emphasis, flow, registry, placements, routedConnections]);
};

export { useFinanceInfraCanvasPayload };

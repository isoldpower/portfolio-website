import { useMemo } from "react";

import { useChannelPlacements } from "@features/integrations/finance-channel-placement";
import { useConnectionRouting } from "@features/integrations/finance-connection-routing";
import { useAnchorRemeasure, useNodeAnchors } from "@features/integrations/finance-node-anchors";
import { useNodeFocus } from "@features/integrations/finance-node-focus";
import { useNodeInstances } from "@features/integrations/finance-node-instances";
import { usePartitionTopology } from "@features/integrations/finance-partition-topology";
import { useFlowEmphasis, useRequestFlow } from "@features/integrations/finance-request-flow";
import { useMarkerPrefix } from "@features/integrations/finance-topology";

import type { FinanceInfraCanvasPayload, FinanceTopology } from "@entities/integrations/model";


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

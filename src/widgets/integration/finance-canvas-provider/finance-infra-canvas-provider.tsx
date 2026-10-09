import { useMemo } from "react";

import { FinanceInfraCanvasContext } from "@entities/integration/finance-infra";
import { useChannelPlacements } from "@features/integration/finance-channel-placement";
import { useConnectionRouting } from "@features/integration/finance-connection-routing";
import { useAnchorRemeasure, useNodeAnchors } from "@features/integration/finance-node-anchors";
import { useNodeFocus } from "@features/integration/finance-node-focus";
import { useNodeInstances } from "@features/integration/finance-node-instances";
import { usePartitionTopology } from "@features/integration/finance-partition-topology";
import { useMarkerPrefix } from "@features/integration/finance-topology";

import type { FinanceInfraCanvasPayload, FinanceTopology } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasProviderProps {
    topology: FinanceTopology;
    children: ReactNode;
}

const FinanceInfraCanvasProvider: FC<FinanceInfraCanvasProviderProps> = ({ topology, children }) => {
    const markerPrefix = useMarkerPrefix();
    const instancedTopology = useNodeInstances(topology);
    const layout = usePartitionTopology(instancedTopology);
    const focus = useNodeFocus(instancedTopology.connections);
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

    const canvasContext = useMemo<FinanceInfraCanvasPayload>(() => ({
        markerPrefix,
        layout,
        ...focus,
        registry,
        placements,
        routedConnections,
    }), [markerPrefix, layout, focus, registry, placements, routedConnections]);

    return (
        <FinanceInfraCanvasContext value={canvasContext}>
            {children}
        </FinanceInfraCanvasContext>
    );
};

export { FinanceInfraCanvasProvider };
export type { FinanceInfraCanvasProviderProps };

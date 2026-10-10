import type { FinanceChannelPlacement, FinanceInfraEmphasis, FinanceInfraLayout } from "./finance-infra.ts";
import type { FinanceInfraEdgePulse, FinanceRequestFlow } from "./request-flow.ts";
import type { FinanceTopologyConnection } from "./types.ts";
import type { FocusEventHandler, PointerEventHandler, RefCallback } from "react";


interface FinanceInfraAnchorRegistry {
    readonly containerRef: RefCallback<HTMLElement>;
    refFor(id: string): RefCallback<HTMLElement>;
}

interface FinanceInfraRoutedConnection {
    key: string;
    connection: FinanceTopologyConnection;
    path: string;
}

type FinanceInfraChannelPlacements = ReadonlyMap<string, FinanceChannelPlacement>;

interface FinanceInfraFocusHandlers {
    onPointerEnter: PointerEventHandler<HTMLElement>;
    onPointerLeave: PointerEventHandler<HTMLElement>;
    onFocus: FocusEventHandler<HTMLElement>;
    onBlur: FocusEventHandler<HTMLElement>;
}

interface FinanceInfraCanvasPayload {
    registry: FinanceInfraAnchorRegistry;
    layout: FinanceInfraLayout;
    focusHandlers: FinanceInfraFocusHandlers;
    nodeEmphasisOf: (nodeId: string) => FinanceInfraEmphasis;
    connectionEmphasisOf: (connection: FinanceTopologyConnection) => FinanceInfraEmphasis;
    connectionPulseOf: (connection: FinanceTopologyConnection) => FinanceInfraEdgePulse | null;
    flow: FinanceRequestFlow;
    markerPrefix: string;
    placements: FinanceInfraChannelPlacements;
    routedConnections: FinanceInfraRoutedConnection[];
}

export type {
    FinanceInfraAnchorRegistry,
    FinanceInfraRoutedConnection,
    FinanceInfraChannelPlacements,
    FinanceInfraFocusHandlers,
    FinanceInfraCanvasPayload
};

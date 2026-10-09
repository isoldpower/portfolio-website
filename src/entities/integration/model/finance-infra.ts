import type { FinanceTopologyNode } from "./types.ts";


type FinanceInfraSectionId = "client" | "core" | "streaming";

type FinanceInfraEmphasis = "default" | "active" | "muted";

type FinanceConnectionTone = "request" | "query" | "stream" | "cdc" | "telemetry";

type FinanceInfraPortSide = "left" | "right" | "top" | "bottom";

type FinanceTopicPortSide = Extract<FinanceInfraPortSide, "top" | "bottom">;

type FinanceTopicDirection = "top-to-bottom" | "bottom-to-top";

type FinanceInfraLaneColumnId = "services" | "storages" | "messaging";

type FinanceInfraLaneSlotId = FinanceInfraLaneColumnId | "external";

type FinanceInfraLaneLayout = {
    id: string;
    title: string;
} & Record<FinanceInfraLaneSlotId, FinanceTopologyNode[]>;

interface FinanceTopicChannel {
    id: string;
    title: string;
    topics: FinanceTopologyNode[];
}

interface FinanceInfraStreamingLayout {
    channels: FinanceTopicChannel[];
}

interface FinanceInfraLayout {
    client: FinanceTopologyNode[];
    edge: FinanceInfraLaneLayout | undefined;
    core: FinanceInfraLaneLayout[];
    streaming: FinanceInfraStreamingLayout;
}

interface FinanceInfraAnchor {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FinanceInfraPort {
    x: number;
    y: number;
    directionX: number;
    directionY: number;
}

interface FinanceChannelPlacement {
    x: number;
    y: number;
    direction: FinanceTopicDirection;
    inflow: FinanceTopicPortSide;
}

export type {
    FinanceInfraSectionId,
    FinanceInfraEmphasis,
    FinanceConnectionTone,
    FinanceInfraPortSide,
    FinanceTopicPortSide,
    FinanceTopicDirection,
    FinanceInfraLaneColumnId,
    FinanceInfraLaneSlotId,
    FinanceInfraLaneLayout,
    FinanceTopicChannel,
    FinanceInfraStreamingLayout,
    FinanceInfraLayout,
    FinanceInfraAnchor,
    FinanceInfraPort,
    FinanceChannelPlacement
};

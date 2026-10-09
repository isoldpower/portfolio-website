import type { FinanceTopologyNode } from "./types.ts";


type FinanceInfraSectionId = "client" | "core" | "streaming";

type FinanceInfraEmphasis = "default" | "active" | "muted";

type FinanceConnectionTone = "request" | "query" | "stream" | "cdc" | "telemetry";

type FinanceInfraPortSide = "left" | "right" | "top" | "bottom";

type FinanceTopicPortSide = Extract<FinanceInfraPortSide, "top" | "bottom">;

interface FinanceInfraLaneLayout {
    id: string;
    title: string;
    primary: FinanceTopologyNode[];
    secondary: FinanceTopologyNode[];
}

interface FinanceTopicChannel {
    id: string;
    title: string;
    topics: FinanceTopologyNode[];
}

interface FinanceInfraStreamingLayout {
    connectors: FinanceTopologyNode[];
    channels: FinanceTopicChannel[];
}

interface FinanceInfraLayout {
    client: FinanceTopologyNode[];
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
    inflow: FinanceTopicPortSide;
}

export type {
    FinanceInfraSectionId,
    FinanceInfraEmphasis,
    FinanceConnectionTone,
    FinanceInfraPortSide,
    FinanceTopicPortSide,
    FinanceInfraLaneLayout,
    FinanceTopicChannel,
    FinanceInfraStreamingLayout,
    FinanceInfraLayout,
    FinanceInfraAnchor,
    FinanceInfraPort,
    FinanceChannelPlacement
};

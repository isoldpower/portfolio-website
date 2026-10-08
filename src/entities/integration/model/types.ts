type IntegratedProjectType = "finance";

type FinanceNodeType =
    | "client"
    | "gateway"
    | "service"
    | "worker"
    | "stream-processor"
    | "database"
    | "cache"
    | "ledger"
    | "search"
    | "topic"
    | "connector"
    | "observability"
    | "external";

type FinanceConnectionKind = "request" | "query" | "publish" | "consume" | "cdc" | "push" | "telemetry";

type FinanceDeployment = "core" | "search" | "stream" | "client" | "external";

type FinanceTelemetryAttributes = Record<string, string | number | boolean>;

interface FinanceNodeTelemetry {
    serviceNames: string[];
    attributes: FinanceTelemetryAttributes;
}

interface FinanceTopologyGroup {
    id: string;
    name: string;
}

interface FinanceTopologyNode {
    id: string;
    name: string;
    type: FinanceNodeType;
    technology: string;
    groupId: string;
    deployment: FinanceDeployment;
    description: string;
    telemetry: FinanceNodeTelemetry;
}

interface FinanceTopologyConnection {
    from: string;
    to: string;
    kind: FinanceConnectionKind;
    protocol: string;
    description: string;
}

interface FinanceTopology {
    version: number;
    groups: FinanceTopologyGroup[];
    nodes: FinanceTopologyNode[];
    connections: FinanceTopologyConnection[];
}

type FinanceSpanKind = "server" | "client" | "internal" | "producer" | "consumer";

type FinanceSpanStatus = "ok" | "error" | "unset";

interface FinanceDemoSpan {
    traceId: string;
    spanId: string;
    parentSpanId: string | null;
    service: string;
    name: string;
    kind: FinanceSpanKind;
    status: FinanceSpanStatus;
    startTimeUnixNano: bigint;
    endTimeUnixNano: bigint;
    durationMs: number;
    attributes: FinanceTelemetryAttributes;
    narrative: string;
}

export type {
    IntegratedProjectType,
    FinanceNodeType,
    FinanceConnectionKind,
    FinanceDeployment,
    FinanceTelemetryAttributes,
    FinanceNodeTelemetry,
    FinanceTopologyGroup,
    FinanceTopologyNode,
    FinanceTopologyConnection,
    FinanceTopology,
    FinanceSpanKind,
    FinanceSpanStatus,
    FinanceDemoSpan
};

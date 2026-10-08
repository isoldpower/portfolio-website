import type { FinanceProjectApiClient } from "./client/FinanceProjectApiClient.ts";


interface IntegrationApiServers {
    financeProjectApi: FinanceProjectApiClient;
}

type FinanceNodeTypeDto =
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

type FinanceConnectionKindDto = "request" | "query" | "publish" | "consume" | "cdc" | "push" | "telemetry";

type FinanceDeploymentDto = "core" | "search" | "stream" | "client" | "external";

type FinanceTelemetryAttributesDto = Record<string, string | number | boolean>;

type FinanceNodeTelemetryDto = {
    serviceNames?: string[];
    attributes?: FinanceTelemetryAttributesDto;
} | null;

interface FinanceTopologyGroupDto {
    id: string;
    name: string;
}

interface FinanceTopologyNodeDto {
    id: string;
    name: string;
    type: FinanceNodeTypeDto;
    technology: string;
    group: string;
    deployment: FinanceDeploymentDto;
    description: string;
    telemetry: FinanceNodeTelemetryDto;
}

interface FinanceTopologyConnectionDto {
    from: string;
    to: string;
    kind: FinanceConnectionKindDto;
    protocol: string;
    description: string;
}

interface FinanceTopologyDto {
    version: number;
    groups: FinanceTopologyGroupDto[];
    nodes: FinanceTopologyNodeDto[];
    connections: FinanceTopologyConnectionDto[];
}

type FinanceSpanKindDto = "server" | "client" | "internal" | "producer" | "consumer";

type FinanceSpanStatusDto = "ok" | "error" | "unset";

interface FinanceSpanDto {
    traceId: string;
    spanId: string;
    parentSpanId?: string;
    service: string;
    name: string;
    kind: FinanceSpanKindDto;
    status: FinanceSpanStatusDto;
    startTimeUnixNano: string;
    endTimeUnixNano: string;
    durationMs: number;
    attributes: FinanceTelemetryAttributesDto;
    narrative: string;
}

type FinanceTraceEventDto =
    | { type: "open" }
    | { type: "span"; span: FinanceSpanDto };

export type {
    IntegrationApiServers,
    FinanceNodeTypeDto,
    FinanceConnectionKindDto,
    FinanceDeploymentDto,
    FinanceTelemetryAttributesDto,
    FinanceNodeTelemetryDto,
    FinanceTopologyGroupDto,
    FinanceTopologyNodeDto,
    FinanceTopologyConnectionDto,
    FinanceTopologyDto,
    FinanceSpanKindDto,
    FinanceSpanStatusDto,
    FinanceSpanDto,
    FinanceTraceEventDto
};

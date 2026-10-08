import type {
    FinanceNodeTelemetryDto,
    FinanceSpanDto,
    FinanceTopologyConnectionDto,
    FinanceTopologyDto,
    FinanceTopologyGroupDto,
    FinanceTopologyNodeDto
} from "./types.ts";
import type {
    FinanceDemoSpan,
    FinanceNodeTelemetry,
    FinanceTopology,
    FinanceTopologyConnection,
    FinanceTopologyGroup,
    FinanceTopologyNode
} from "@entities/integration/model";


function mapTopologyGroup(dto: FinanceTopologyGroupDto): FinanceTopologyGroup {
    return {
        id: dto.id,
        name: dto.name,
    };
}

function mapNodeTelemetry(dto: FinanceNodeTelemetryDto): FinanceNodeTelemetry {
    return {
        serviceNames: dto?.serviceNames ?? [],
        attributes: dto?.attributes ?? {},
    };
}

function mapTopologyNode(dto: FinanceTopologyNodeDto): FinanceTopologyNode {
    return {
        id: dto.id,
        name: dto.name,
        type: dto.type,
        technology: dto.technology,
        groupId: dto.group,
        deployment: dto.deployment,
        description: dto.description,
        telemetry: mapNodeTelemetry(dto.telemetry),
    };
}

function mapTopologyConnection(dto: FinanceTopologyConnectionDto): FinanceTopologyConnection {
    return {
        from: dto.from,
        to: dto.to,
        kind: dto.kind,
        protocol: dto.protocol,
        description: dto.description,
    };
}

function mapFinanceTopology(dto: FinanceTopologyDto): FinanceTopology {
    return {
        version: dto.version,
        groups: dto.groups.map(mapTopologyGroup),
        nodes: dto.nodes.map(mapTopologyNode),
        connections: dto.connections.map(mapTopologyConnection),
    };
}

function parentSpanIdOf(dto: FinanceSpanDto): string | null {
    if (dto.parentSpanId === undefined || dto.parentSpanId === "") {
        return null;
    }

    return dto.parentSpanId;
}

function mapFinanceSpan(dto: FinanceSpanDto): FinanceDemoSpan {
    return {
        traceId: dto.traceId,
        spanId: dto.spanId,
        parentSpanId: parentSpanIdOf(dto),
        service: dto.service,
        name: dto.name,
        kind: dto.kind,
        status: dto.status,
        startTimeUnixNano: BigInt(dto.startTimeUnixNano),
        endTimeUnixNano: BigInt(dto.endTimeUnixNano),
        durationMs: dto.durationMs,
        attributes: dto.attributes,
        narrative: dto.narrative,
    };
}

export {
    mapNodeTelemetry,
    mapTopologyGroup,
    mapTopologyNode,
    mapTopologyConnection,
    mapFinanceTopology,
    mapFinanceSpan
};

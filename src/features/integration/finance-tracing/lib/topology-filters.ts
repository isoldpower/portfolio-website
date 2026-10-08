import type { FinanceTopology, FinanceTopologyConnection } from "@entities/integration/model";


function isVisibleConnection(connection: FinanceTopologyConnection): boolean {
    return connection.kind !== "telemetry";
}

function withoutTelemetryConnections(topology: FinanceTopology): FinanceTopology {
    return {
        ...topology,
        connections: topology.connections.filter(isVisibleConnection),
    };
}

export { withoutTelemetryConnections };

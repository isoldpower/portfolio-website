import { useQuery } from "@tanstack/react-query";
import { financeTopologyQueryOptions, useFinanceProjectApiClient } from "../api";
import { withoutTelemetryConnections } from "./lib/topology-filters.ts";

import type { FinanceTopology } from "@entities/integration/model";
import type { UseQueryResult } from "@tanstack/react-query";


interface UseFinanceProjectTopologyOptions {
    includeTelemetry?: boolean;
}

function useFinanceProjectTopology({
    includeTelemetry = false
}: UseFinanceProjectTopologyOptions = {}): UseQueryResult<FinanceTopology> {
    const client = useFinanceProjectApiClient();

    return useQuery({
        ...financeTopologyQueryOptions(client),
        select: includeTelemetry ? undefined : withoutTelemetryConnections,
    });
}

export { useFinanceProjectTopology };
export type { UseFinanceProjectTopologyOptions };

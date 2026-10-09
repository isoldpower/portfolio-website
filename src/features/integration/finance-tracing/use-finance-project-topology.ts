import { useQuery } from "@tanstack/react-query";
import { financeTopologyQueryOptions, useFinanceProjectApiClient } from "../api";
import { useTelemetryFilter } from "./use-telemetry-filter.ts";

import type { FinanceTopology } from "@entities/integration/model";
import type { UseQueryResult } from "@tanstack/react-query";


interface UseFinanceProjectTopologyOptions {
    includeTelemetry?: boolean;
}

function useFinanceProjectTopology({
    includeTelemetry = false
}: UseFinanceProjectTopologyOptions = {}): UseQueryResult<FinanceTopology> {
    const client = useFinanceProjectApiClient();
    const telemetryFilter = useTelemetryFilter();

    return useQuery({
        ...financeTopologyQueryOptions(client),
        select: includeTelemetry
            ? undefined
            : telemetryFilter,
    });
}

export { useFinanceProjectTopology };
export type { UseFinanceProjectTopologyOptions };

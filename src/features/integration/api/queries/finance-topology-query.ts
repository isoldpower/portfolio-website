import { queryOptions } from "@tanstack/react-query";

import { mapFinanceTopology } from "../mappers.ts";

import { financeTracingKeys } from "./query-keys.ts";

import type { FinanceProjectApiClient } from "../client/FinanceProjectApiClient.ts";
import type { FinanceTopology } from "@entities/integration/model";
import type { QueryFunctionContext } from "@tanstack/react-query";


const TOPOLOGY_STALE_TIME_MS = 300_000;

async function fetchFinanceTopology(
    client: FinanceProjectApiClient,
    context: QueryFunctionContext
): Promise<FinanceTopology> {
    return mapFinanceTopology(await client.getTopology(context.signal));
}

function financeTopologyQueryOptions(client: FinanceProjectApiClient) {
    return queryOptions({
        queryKey: financeTracingKeys.topology(),
        queryFn: fetchFinanceTopology.bind(null, client),
        staleTime: TOPOLOGY_STALE_TIME_MS,
    });
}

export { financeTopologyQueryOptions };

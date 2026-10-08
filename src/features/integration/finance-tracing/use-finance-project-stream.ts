import { useQuery } from "@tanstack/react-query";
import { financeTraceStreamQueryOptions, useFinanceProjectApiClient } from "../api";

import type { FinanceTraceStreamSnapshot } from "../api";
import type { UseQueryResult } from "@tanstack/react-query";


function useFinanceProjectStream(session: string | null): UseQueryResult<FinanceTraceStreamSnapshot> {
    const client = useFinanceProjectApiClient();

    return useQuery(financeTraceStreamQueryOptions(client, session));
}

export { useFinanceProjectStream };

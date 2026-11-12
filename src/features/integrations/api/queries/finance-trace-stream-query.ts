import { experimental_streamedQuery as streamedQuery, queryOptions, skipToken } from "@tanstack/react-query";

import { financeTracingKeys } from "./query-keys.ts";
import { INITIAL_TRACE_STREAM, reduceTraceEvent } from "./reduce-trace-event.ts";

import type { FinanceProjectApiClient } from "../client/FinanceProjectApiClient.ts";
import type { FinanceTraceEventDto } from "../types.ts";
import type { QueryFunctionContext } from "@tanstack/react-query";


function openTraceStream(
    client: FinanceProjectApiClient,
    session: string,
    context: QueryFunctionContext
): AsyncIterable<FinanceTraceEventDto> {
    return client.streamTraces(session, context.signal);
}

function traceStreamQueryFn(client: FinanceProjectApiClient, session: string | null) {
    if (session === null) {
        return skipToken;
    }

    return streamedQuery({
        streamFn: openTraceStream.bind(null, client, session),
        reducer: reduceTraceEvent,
        initialValue: INITIAL_TRACE_STREAM,
    });
}

function financeTraceStreamQueryOptions(client: FinanceProjectApiClient, session: string | null) {
    return queryOptions({
        queryKey: financeTracingKeys.traceStream(session),
        queryFn: traceStreamQueryFn(client, session),
        staleTime: Infinity,
        gcTime: 0,
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}

export { financeTraceStreamQueryOptions };

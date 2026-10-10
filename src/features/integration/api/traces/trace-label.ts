import { ROUTE_ATTRIBUTE, UNLABELED_TRACE } from "./trace-attributes.ts";

import type { FinanceDemoSpan } from "@entities/integration/model";


function routeLengthOf(span: FinanceDemoSpan): number {
    const route = span.attributes[ROUTE_ATTRIBUTE];

    return typeof route === "string" ? route.length : -1;
}

function traceLabelOf(spans: readonly FinanceDemoSpan[]): string {
    const mostSpecificRouted = spans.reduce<FinanceDemoSpan | undefined>((best, span) => {
        return routeLengthOf(span) > (best === undefined ? -1 : routeLengthOf(best)) ? span : best;
    }, undefined);
    const rootSpan = spans.find((span) => {
        return span.parentSpanId === null;
    });

    return mostSpecificRouted?.name
        ?? rootSpan?.name
        ?? spans[0]?.name
        ?? UNLABELED_TRACE;
}

export { traceLabelOf };

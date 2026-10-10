import {
    FAILED_STATUS_CODE_FLOOR,
    REQUEST_SPAN_KIND,
    ROUTE_ATTRIBUTE,
    STATUS_CODE_ATTRIBUTES,
} from "./trace-attributes.ts";

import type { FinanceDemoSpan } from "@entities/integration/model";


function statusCodeOf(span: FinanceDemoSpan): number | null {
    for (const attributeName of STATUS_CODE_ATTRIBUTES) {
        const statusCode = Number(span.attributes[attributeName]);

        if (Number.isInteger(statusCode) && statusCode > 0) {
            return statusCode;
        }
    }

    return null;
}

function responseSpanOf(spans: readonly FinanceDemoSpan[]): FinanceDemoSpan | undefined {
    const requestSpans = spans.filter((span) => {
        return span.kind === REQUEST_SPAN_KIND;
    });

    return requestSpans.find((span) => {
        return span.parentSpanId === null;
    }) ?? requestSpans.find((span) => {
        return span.attributes[ROUTE_ATTRIBUTE] !== undefined;
    });
}

function isTraceFailed(spans: readonly FinanceDemoSpan[]): boolean {
    const responseSpan = responseSpanOf(spans);

    if (responseSpan === undefined) {
        return false;
    }

    const statusCode = statusCodeOf(responseSpan);
    const failedStatusCode = statusCode !== null && statusCode >= FAILED_STATUS_CODE_FLOOR;
    return responseSpan.status === "error" || failedStatusCode;
}

function hasFailedSpan(spans: readonly FinanceDemoSpan[]): boolean {
    return spans.some((span) => {
        return span.status === "error";
    });
}

export { hasFailedSpan, isTraceFailed };

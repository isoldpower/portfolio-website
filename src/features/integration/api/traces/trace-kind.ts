import { METHOD_ATTRIBUTES, REQUEST_SPAN_KIND, ROUTE_ATTRIBUTE } from "./trace-attributes.ts";

import type { FinanceDemoSpan, FinanceTraceKind } from "@entities/integration/model";


const SPAN_NAME_SEPARATOR = " ";
const HTTP_METHODS: ReadonlySet<string> = new Set([
    "GET",
    "HEAD",
    "OPTIONS",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
]);
const SAFE_METHODS: ReadonlySet<string> = new Set([
    "GET",
    "HEAD",
    "OPTIONS"
]);

function methodOf(span: FinanceDemoSpan): string | null {
    for (const attributeName of METHOD_ATTRIBUTES) {
        const attributeValue = span.attributes[attributeName];

        if (typeof attributeValue === "string" && attributeValue !== "") {
            return attributeValue.toUpperCase();
        }
    }

    const nameMethod = span.name.split(SPAN_NAME_SEPARATOR)[0]?.toUpperCase() ?? "";
    return HTTP_METHODS.has(nameMethod) ? nameMethod : null;
}

function isRouted(span: FinanceDemoSpan): boolean {
    return span.attributes[ROUTE_ATTRIBUTE] !== undefined;
}

function traceKindOf(spans: readonly FinanceDemoSpan[]): FinanceTraceKind | null {
    const requestSpans = spans
        .filter((span) => {
            return span.kind === REQUEST_SPAN_KIND;
        })
        .sort((left, right) => {
            return Number(isRouted(right)) - Number(isRouted(left));
        });

    for (const span of requestSpans) {
        const method = methodOf(span);

        if (method !== null) {
            return SAFE_METHODS.has(method) ? "query" : "mutation";
        }
    }

    return null;
}

export { traceKindOf };

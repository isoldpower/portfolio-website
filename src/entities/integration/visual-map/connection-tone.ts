import type { FinanceConnectionKind, FinanceConnectionTone } from "@entities/integration/model";


const TONE_BY_KIND: Record<FinanceConnectionKind, FinanceConnectionTone> = {
    request: "request",
    push: "request",
    query: "query",
    publish: "stream",
    consume: "stream",
    cdc: "cdc",
    telemetry: "telemetry",
};

const TONE_COLOR_CLASSES: Record<FinanceConnectionTone, string> = {
    request: "text-accent",
    query: "text-muted",
    stream: "text-positive",
    cdc: "text-amber-500",
    telemetry: "text-subtle",
};

const CONNECTION_TONES = Object.keys(TONE_COLOR_CLASSES) as FinanceConnectionTone[];

function resolveConnectionTone(kind: FinanceConnectionKind): FinanceConnectionTone {
    return TONE_BY_KIND[kind];
}

function resolveToneColorClass(tone: FinanceConnectionTone): string {
    return TONE_COLOR_CLASSES[tone];
}

export { CONNECTION_TONES, resolveConnectionTone, resolveToneColorClass };

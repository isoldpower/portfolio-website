import type { FinanceConnectionTone } from "@entities/integration/model";


function markerIdOf(markerPrefix: string, tone: FinanceConnectionTone): string {
    return `${markerPrefix}-arrow-${tone}`;
}

export { markerIdOf };

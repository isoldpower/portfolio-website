import { use } from "react";

import { FinanceInfraCanvasContext } from "./finance-infra-canvas-context.ts";

import type { FinanceInfraCanvasPayload } from "@entities/integration/model";


function useFinanceInfraCanvas(): FinanceInfraCanvasPayload {
    const context = use(FinanceInfraCanvasContext);

    if (context === null) {
        throw new Error("useFinanceInfraCanvas must be used within a FinanceInfraCanvasProvider");
    }

    return context;
}

export { useFinanceInfraCanvas };

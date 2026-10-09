import { createContext } from "react";

import type { FinanceInfraCanvasPayload } from "@entities/integration/model";


const FinanceInfraCanvasContext = createContext<FinanceInfraCanvasPayload | null>(null);

export { FinanceInfraCanvasContext };

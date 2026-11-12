import { createContext } from "react";

import type { FinanceInfraCanvasPayload } from "@entities/integrations/model";


const FinanceInfraCanvasContext = createContext<FinanceInfraCanvasPayload | null>(null);

export { FinanceInfraCanvasContext };

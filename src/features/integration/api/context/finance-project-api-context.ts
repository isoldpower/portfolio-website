import { createContext } from "react";

import type { FinanceProjectApiClient } from "../client/FinanceProjectApiClient.ts";


const FinanceProjectApiContext = createContext<FinanceProjectApiClient | null>(null);

export { FinanceProjectApiContext };

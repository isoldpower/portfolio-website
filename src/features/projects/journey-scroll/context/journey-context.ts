import { createContext } from "react";

import type { JourneyContextValue } from "../types.ts";


const JourneyContext = createContext<JourneyContextValue | null>(null);

export { JourneyContext };

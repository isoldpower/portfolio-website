import { createContext } from "react";

import type { IntroStageStore } from "./IntroStageStore.ts";


const IntroStageContext = createContext<IntroStageStore | null>(null);

export { IntroStageContext };

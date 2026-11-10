import { createContext } from "react";

import type { IntroSceneValue } from "../types.ts";


const IntroSceneContext = createContext<IntroSceneValue | null>(null);

export { IntroSceneContext };

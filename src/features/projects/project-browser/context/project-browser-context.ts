import { createContext } from "react";

import type { ProjectBrowserContextValue } from "../types.ts";


const ProjectBrowserContext = createContext<ProjectBrowserContextValue | null>(null);

export { ProjectBrowserContext };

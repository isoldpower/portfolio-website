import { createContext } from "react";

import type { ProjectApiClient } from "../types.ts";


const ProjectApiContext = createContext<ProjectApiClient | null>(null);

export { ProjectApiContext };

import { useContext } from "react";

import { ProjectBrowserContext } from "./project-browser-context.ts";

import type { ProjectBrowserContextValue } from "../types.ts";


type UseProjectBrowserReturn = ProjectBrowserContextValue;

const useProjectBrowser = (): UseProjectBrowserReturn => {
    const browserContextValue = useContext(ProjectBrowserContext);
    if (!browserContextValue) {
        throw new Error("useProjectBrowser must be used inside ProjectBrowserProvider");
    }

    return browserContextValue;
};

export { useProjectBrowser };
export type { UseProjectBrowserReturn };

import { createContext, useId, useMemo } from "react";

import type { FC, ReactNode } from "react";
import type { DemoContextPayload } from "./types.ts";


const DemoContext = createContext<DemoContextPayload | null>(null);

interface DemoContextProviderProps {
    children: ReactNode;
}

const DemoContextProvider: FC<DemoContextProviderProps> = ({ children }) => {
    const demoId = useId();

    const contextValue = useMemo<DemoContextPayload>(() => ({
        demoId
    }), [demoId]);

    return (
        <DemoContext value={contextValue}>
            {children}
        </DemoContext>
    );
}

export { DemoContextProvider, DemoContext };
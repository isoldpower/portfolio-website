import { createContext, useMemo, useSyncExternalStore } from "react";

import { demoSessionStore } from "./DemoSessionStore.ts";

import type { FC, ReactNode } from "react";
import type { DemoContextPayload } from "./types.ts";


const DemoContext = createContext<DemoContextPayload | null>(null);

interface DemoContextProviderProps {
    children: ReactNode;
}

const DemoContextProvider: FC<DemoContextProviderProps> = ({ children }) => {
    const demoSession = useSyncExternalStore(
        demoSessionStore.subscribe,
        demoSessionStore.getSnapshot,
        demoSessionStore.getServerSnapshot
    );

    const contextValue = useMemo<DemoContextPayload>(() => ({
        demoSession
    }), [demoSession]);

    return (
        <DemoContext value={contextValue}>
            {children}
        </DemoContext>
    );
}

export { DemoContextProvider, DemoContext };

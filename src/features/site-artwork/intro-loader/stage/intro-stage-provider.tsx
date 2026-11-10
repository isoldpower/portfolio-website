import { useState } from "react";

import { IntroStageContext } from "./intro-stage-context.ts";
import { IntroStageStore } from "./IntroStageStore.ts";

import type { FC, ReactNode } from "react";


interface IntroStageProviderProps {
    isEnabled: boolean;
    children: ReactNode;
}

const IntroStageProvider: FC<IntroStageProviderProps> = ({ isEnabled, children }) => {
    const [store] = useState(() => {
        return new IntroStageStore(isEnabled);
    });

    return (
        <IntroStageContext value={store}>
            {children}
        </IntroStageContext>
    );
};

IntroStageProvider.displayName = "IntroStageProvider";

export { IntroStageProvider };
export type { IntroStageProviderProps };

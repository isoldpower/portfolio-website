import { JourneyPanelsItem } from "./panel/journey-panels-item.tsx";

import type { JourneyPanelsItemProps } from "./panel/journey-panels-item.tsx";
import type { FC, ReactNode } from "react";


interface JourneyPanelsProps {
    children: ReactNode;
}

type JourneyPanelsObject = FC<JourneyPanelsProps> & {
    Item: FC<JourneyPanelsItemProps>;
};

const JourneyPanels: JourneyPanelsObject = ({ children }) => {
    return (
        <div data-journey="panels" className="relative mt-6 h-90 opacity-0">
            {children}
        </div>
    );
};

JourneyPanels.Item = JourneyPanelsItem;
JourneyPanels.displayName = "JourneyPanels";

export { JourneyPanels };
export type { JourneyPanelsProps };

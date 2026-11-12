import type { FC, ReactNode } from "react";


interface JourneySceneWorldItemProps {
    x: number;
    children: ReactNode;
}

const JourneySceneWorldItem: FC<JourneySceneWorldItemProps> = ({ x, children }) => {
    return (
        <div className="absolute bottom-0" style={{ left: x }}>
            {children}
        </div>
    );
};

JourneySceneWorldItem.displayName = "JourneySceneWorldItem";

export { JourneySceneWorldItem };
export type { JourneySceneWorldItemProps };

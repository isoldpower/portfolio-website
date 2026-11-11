import type { FC } from "react";


type JourneySceneGroundProps = Record<string, never>;

const JourneySceneGround: FC<JourneySceneGroundProps> = () => {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 1200 70"
            preserveAspectRatio="none"
            shapeRendering="crispEdges"
            className="absolute bottom-5 left-0 h-17.5 w-full"
        >
            <path d="M0 1H1200" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
};

JourneySceneGround.displayName = "JourneySceneGround";

export { JourneySceneGround };
export type { JourneySceneGroundProps };

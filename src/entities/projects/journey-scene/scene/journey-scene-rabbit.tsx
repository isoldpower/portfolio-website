import { JOURNEY_SPRITES } from "../../visual-map";

import type { FC } from "react";


interface JourneySceneRabbitProps {
    label: string;
}

const RUN_STRIP_STYLE = { backgroundImage: `url("${JOURNEY_SPRITES.rabbitRun}")` };

const JourneySceneRabbit: FC<JourneySceneRabbitProps> = ({ label }) => {
    return (
        <div
            data-journey="rabbit"
            data-running="false"
            role="img"
            aria-label={label}
            className="group/rabbit absolute bottom-22.5 left-[22%] h-20 w-24 in-data-[direction=backward]:-scale-x-100"
        >
            <div
                data-journey="rabbit-run"
                className="absolute inset-0 hidden bg-size-[576px_80px] [image-rendering:pixelated] group-data-[running=true]/rabbit:block"
                style={RUN_STRIP_STYLE}
            />
            <img
                src={JOURNEY_SPRITES.rabbitIdle}
                alt=""
                width={70}
                height={64}
                className="absolute bottom-0 left-3 block [image-rendering:pixelated] group-data-[running=true]/rabbit:hidden"
            />
        </div>
    );
};

JourneySceneRabbit.displayName = "JourneySceneRabbit";

export { JourneySceneRabbit };
export type { JourneySceneRabbitProps };

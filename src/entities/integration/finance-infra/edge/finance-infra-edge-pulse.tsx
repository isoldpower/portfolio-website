import { useFinanceInfraEdge } from "./finance-infra-edge-context.ts";

import type { FC } from "react";


const HOP_STEP_MS = 450;
const HOP_TRAVEL_MS = 750;
const CYCLE_PAUSE_MS = 1600;
const PULSE_RADIUS = 3.5;

const FinanceInfraEdgePulse: FC = () => {
    const { connection, emphasis, pulse } = useFinanceInfraEdge();

    if (pulse === null || emphasis === "muted") {
        return null;
    }

    const cycleMs = (pulse.total - 1) * HOP_STEP_MS + HOP_TRAVEL_MS + CYCLE_PAUSE_MS;
    const start = (pulse.order * HOP_STEP_MS / cycleMs).toFixed(4);
    const end = ((pulse.order * HOP_STEP_MS + HOP_TRAVEL_MS) / cycleMs).toFixed(4);
    const duration = `${String(cycleMs)}ms`;

    return (
        <circle key={pulse.total} r={PULSE_RADIUS} fill="currentColor" opacity={0} className="motion-reduce:hidden">
            <animateMotion
                path={connection.path}
                dur={duration}
                repeatCount="indefinite"
                calcMode="linear"
                keyPoints="0;0;1;1"
                keyTimes={`0;${start};${end};1`}
            />
            <animate
                attributeName="opacity"
                values="0;0;1;1;0;0"
                keyTimes={`0;${start};${start};${end};${end};1`}
                dur={duration}
                repeatCount="indefinite"
            />
        </circle>
    );
};

FinanceInfraEdgePulse.displayName = "FinanceInfraEdgePulse";

export { FinanceInfraEdgePulse };

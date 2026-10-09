import { FinanceInfraCanvasLane } from "@entities/integration/finance-infra";

import { LaneServiceNode } from "./lane-service-node.tsx";

import type { LaneRenderer } from "./types.ts";


const CoreLane: LaneRenderer = ({ lane }) => {
    return (
        <FinanceInfraCanvasLane>
            <FinanceInfraCanvasLane.Title>
                {lane.title}
            </FinanceInfraCanvasLane.Title>
            <FinanceInfraCanvasLane.Columns>
                <FinanceInfraCanvasLane.Column>
                    {lane.primary.map((node) => (
                        <LaneServiceNode key={node.id} node={node} />
                    ))}
                </FinanceInfraCanvasLane.Column>
                <FinanceInfraCanvasLane.Column>
                    {lane.secondary.map((node) => (
                        <LaneServiceNode key={node.id} node={node} />
                    ))}
                </FinanceInfraCanvasLane.Column>
            </FinanceInfraCanvasLane.Columns>
        </FinanceInfraCanvasLane>
    );
};


export { CoreLane };

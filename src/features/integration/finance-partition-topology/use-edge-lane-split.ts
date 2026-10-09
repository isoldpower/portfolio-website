import { useMemo } from "react";
import { EDGE_GROUP_ID } from "./node-types.ts";

import type { FinanceInfraLaneLayout } from "@entities/integration/model";


interface UseEdgeLaneSplitReturn {
    edge: FinanceInfraLaneLayout | undefined;
    core: FinanceInfraLaneLayout[];
}

const useEdgeLaneSplit = (lanes: FinanceInfraLaneLayout[]): UseEdgeLaneSplitReturn => {
    const edge = useMemo(() => {
        return lanes.find((lane) => {
            return lane.id === EDGE_GROUP_ID;
        });
    }, [lanes]);

    const core = useMemo(() => {
        return lanes.filter((lane) => {
            return lane.id !== EDGE_GROUP_ID;
        });
    }, [lanes]);

    return useMemo(() => ({
        edge,
        core,
    }), [edge, core]);
};

export { useEdgeLaneSplit };
export type { UseEdgeLaneSplitReturn };

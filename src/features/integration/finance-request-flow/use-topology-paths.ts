import { useMemo } from "react";

import { TopologyPathfinder } from "./TopologyPathfinder.ts";

import type { TopologyPath } from "./TopologyPathfinder.ts";
import type { FinanceTopologyConnection } from "@entities/integration/model";


type PathBetween = (from: string, to: string) => TopologyPath | null;

const useTopologyPaths = (connections: readonly FinanceTopologyConnection[]): PathBetween => {
    return useMemo(() => {
        return new TopologyPathfinder(connections).pathBetween;
    }, [connections]);
};

export { useTopologyPaths };
export type { PathBetween };

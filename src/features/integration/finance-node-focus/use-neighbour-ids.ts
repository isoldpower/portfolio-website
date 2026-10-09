import { useCallback, useMemo } from "react";

import type { FinanceTopologyConnection } from "@entities/integration/model";


interface UseNeighbourIdsParams {
    connections: FinanceTopologyConnection[];
    nodeId: string | null;
}

const useNeighbourIds = ({ connections, nodeId }: UseNeighbourIdsParams): ReadonlySet<string> => {
    const collectNeighbourIds = useCallback(() => {
        const ids = new Set<string>();

        for (const connection of connections) {
            if (connection.from === nodeId) {
                ids.add(connection.to);
            }

            if (connection.to === nodeId) {
                ids.add(connection.from);
            }
        }

        return ids;
    }, [connections, nodeId]);

    return useMemo(() => collectNeighbourIds(), [collectNeighbourIds]);
};

export { useNeighbourIds };
export type { UseNeighbourIdsParams };

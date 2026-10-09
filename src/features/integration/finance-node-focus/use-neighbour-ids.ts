import { useCallback, useMemo } from "react";

import type { FinanceTopologyConnection } from "@entities/integration/model";


interface UseNeighbourIdsParams {
    connections: FinanceTopologyConnection[];
    nodeId: string | null;
}

const useNeighbourIds = ({ connections, nodeId }: UseNeighbourIdsParams): ReadonlySet<string> => {
    const collectNeighbourIds = useCallback(() => {
        return new Set(connections.flatMap((connection) => {
            if (connection.from === nodeId) {
                return [connection.to];
            }

            return connection.to === nodeId ? [connection.from] : [];
        }));
    }, [connections, nodeId]);

    return useMemo(() => {
        return collectNeighbourIds();
    }, [collectNeighbourIds]);
};

export { useNeighbourIds };
export type { UseNeighbourIdsParams };

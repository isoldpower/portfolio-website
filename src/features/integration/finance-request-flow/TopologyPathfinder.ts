import { MAX_JUMP_HOPS } from "./constants.ts";
import { hopKeyOf } from "./hop-key.ts";

import type { FinanceRequestHop, FinanceTopologyConnection } from "@entities/integration/model";


type TopologyPath = readonly FinanceRequestHop[];

class TopologyPathfinder {
    readonly #outgoingIdsById = new Map<string, string[]>();
    readonly #pathsByKey = new Map<string, TopologyPath | null>();

    constructor(connections: readonly FinanceTopologyConnection[]) {
        for (const connection of connections) {
            const outgoingIds = this.#outgoingIdsById.get(connection.from);

            if (outgoingIds === undefined) {
                this.#outgoingIdsById.set(connection.from, [connection.to]);
            } else {
                outgoingIds.push(connection.to);
            }
        }
    }

    readonly pathBetween = (from: string, to: string): TopologyPath | null => {
        const pathKey = hopKeyOf(from, to);

        if (!this.#pathsByKey.has(pathKey)) {
            this.#pathsByKey.set(pathKey, from === to ? [] : this.#search(from, to));
        }

        return this.#pathsByKey.get(pathKey) ?? null;
    };

    #search(from: string, to: string): TopologyPath | null {
        const parentIdById = new Map<string, string>();
        let frontier = [from];

        for (let depth = 0; depth < MAX_JUMP_HOPS && frontier.length > 0; depth++) {
            const nextFrontier: string[] = [];

            for (const nodeId of frontier) {
                for (const nextId of this.#outgoingIdsById.get(nodeId) ?? []) {
                    if (nextId === from || parentIdById.has(nextId)) {
                        continue;
                    }

                    parentIdById.set(nextId, nodeId);

                    if (nextId === to) {
                        return this.#unwind(parentIdById, to);
                    }

                    nextFrontier.push(nextId);
                }
            }

            frontier = nextFrontier;
        }

        return null;
    }

    #unwind(parentIdById: ReadonlyMap<string, string>, to: string): TopologyPath {
        const hops: FinanceRequestHop[] = [];
        let current = to;
        let parentId = parentIdById.get(current);

        while (parentId !== undefined) {
            hops.push({ from: parentId, to: current });
            current = parentId;
            parentId = parentIdById.get(current);
        }

        return hops.reverse();
    }
}

export { TopologyPathfinder };
export type { TopologyPath };

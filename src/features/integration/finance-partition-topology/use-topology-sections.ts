import { useCallback, useMemo } from "react";
import { STREAMING_TYPES } from "./node-types.ts";

import type { FinanceInfraSectionId, FinanceTopologyNode } from "@entities/integration/model";


type UseTopologySectionsReturn = Record<FinanceInfraSectionId, FinanceTopologyNode[]>;

const useTopologySections = (nodes: FinanceTopologyNode[]): UseTopologySectionsReturn => {
    const sectionOf = useCallback((node: FinanceTopologyNode): FinanceInfraSectionId => {
        if (node.deployment === "client") {
            return "client";
        }

        return STREAMING_TYPES.has(node.type)
            ? "streaming"
            : "core";
    }, []);

    const splitSections = useCallback(() => {
        const sections: UseTopologySectionsReturn = {
            client: [],
            core: [],
            streaming: [],
        };

        for (const node of nodes) {
            sections[sectionOf(node)].push(node);
        }

        return sections;
    }, [nodes, sectionOf]);

    return useMemo(() => {
        return splitSections();
    }, [splitSections]);
};

export { useTopologySections };
export type { UseTopologySectionsReturn };

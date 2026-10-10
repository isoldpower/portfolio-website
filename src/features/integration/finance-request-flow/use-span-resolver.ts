import { useCallback } from "react";

import { useSpanNodes } from "./use-span-nodes.ts";

import type { ResolvedSpan } from "./types.ts";
import type { FinanceDemoSpan, FinanceTopology } from "@entities/integration/model";


const UPSTREAM_TARGET_SPAN_KIND = "consumer";

type ResolveSpan = (span: FinanceDemoSpan) => ResolvedSpan | null;

const useSpanResolver = (topology: FinanceTopology): ResolveSpan => {
    const { serviceNodeOf, targetNodeOf } = useSpanNodes(topology);

    return useCallback((span: FinanceDemoSpan): ResolvedSpan | null => {
        const serviceNodeId = serviceNodeOf(span);

        if (serviceNodeId === null) {
            return null;
        }

        const targetNodeId = targetNodeOf(span) ?? serviceNodeId;
        const isTargetUpstream = span.kind === UPSTREAM_TARGET_SPAN_KIND;

        return {
            span,
            serviceNodeId,
            startNodeId: isTargetUpstream ? targetNodeId : serviceNodeId,
            endNodeId: isTargetUpstream ? serviceNodeId : targetNodeId,
        };
    }, [serviceNodeOf, targetNodeOf]);
};

export { useSpanResolver };
export type { ResolveSpan };

import { STREAMING_SECTION_ANCHOR } from "@entities/integration/model";
import { cn } from "@shared/lib/utilities";

import { useFinanceInfraCanvas } from "./context/use-finance-infra-canvas.ts";
import { FinanceInfraSectionClientNodes } from "./section/finance-infra-section-client-nodes.tsx";
import { FinanceInfraSectionCoreLanes } from "./section/finance-infra-section-core-lanes.tsx";
import { FinanceInfraSectionCoreRow } from "./section/finance-infra-section-core-row.tsx";
import { FinanceInfraSectionEdgeLane } from "./section/finance-infra-section-edge-lane.tsx";
import { FinanceInfraSectionStreamingChannels } from "./section/finance-infra-section-streaming-channels.tsx";
import { FinanceInfraSectionTitle } from "./section/finance-infra-section-title.tsx";

import type { FinanceInfraSectionClientNodesProps } from "./section/finance-infra-section-client-nodes.tsx";
import type { FinanceInfraSectionCoreLanesProps } from "./section/finance-infra-section-core-lanes.tsx";
import type { FinanceInfraSectionCoreRowProps } from "./section/finance-infra-section-core-row.tsx";
import type { FinanceInfraSectionEdgeLaneProps } from "./section/finance-infra-section-edge-lane.tsx";
import type { FinanceInfraSectionStreamingChannelsProps } from "./section/finance-infra-section-streaming-channels.tsx";
import type { FinanceInfraSectionTitleProps } from "./section/finance-infra-section-title.tsx";
import type { FinanceInfraSectionId } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasSectionProps {
    section: FinanceInfraSectionId;
    children: ReactNode;
}

type FinanceInfraCanvasSectionObject = FC<FinanceInfraCanvasSectionProps> & {
    Title: FC<FinanceInfraSectionTitleProps>;
    ClientNodes: FC<FinanceInfraSectionClientNodesProps>;
    CoreRow: FC<FinanceInfraSectionCoreRowProps>;
    EdgeLane: FC<FinanceInfraSectionEdgeLaneProps>;
    CoreLanes: FC<FinanceInfraSectionCoreLanesProps>;
    StreamingChannels: FC<FinanceInfraSectionStreamingChannelsProps>;
};

const FinanceInfraCanvasSection: FinanceInfraCanvasSectionObject = ({ section, children }) => {
    const { registry } = useFinanceInfraCanvas();
    const isStreaming = section === "streaming";

    return (
        <section
            ref={isStreaming ? registry.refFor(STREAMING_SECTION_ANCHOR) : undefined}
            data-section={section}
            className={cn("flex h-full min-w-0 flex-col gap-3", isStreaming && "relative")}
        >
            {children}
        </section>
    );
};

FinanceInfraCanvasSection.Title = FinanceInfraSectionTitle;
FinanceInfraCanvasSection.ClientNodes = FinanceInfraSectionClientNodes;
FinanceInfraCanvasSection.CoreRow = FinanceInfraSectionCoreRow;
FinanceInfraCanvasSection.EdgeLane = FinanceInfraSectionEdgeLane;
FinanceInfraCanvasSection.CoreLanes = FinanceInfraSectionCoreLanes;
FinanceInfraCanvasSection.StreamingChannels = FinanceInfraSectionStreamingChannels;
FinanceInfraCanvasSection.displayName = "FinanceInfraCanvasSection";

export { FinanceInfraCanvasSection };
export type { FinanceInfraCanvasSectionProps };

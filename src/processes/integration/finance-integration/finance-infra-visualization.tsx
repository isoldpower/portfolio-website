import {
    FinanceInfraCanvasEdgeLayer,
    FinanceInfraCanvasSection,
    FinanceInfraCanvasShell
} from "@entities/integration/finance-infra";
import { Disclosure } from "@shared/ui-toolkit";
import { useTraceDrawer } from "@features/integration/finance-trace-drawer";
import { RenderTopologyFx } from "@features/integration/finance-topology";
import { useFinanceProjectTopology } from "@features/integration/finance-tracing";

import {
    CoreLane,
    DataChannelNode,
    EdgeLane,
    FlowEdge,
    TraceDrawerBar,
    TraceSelectorBar,
    TraceStatusLine,
    WebClientTopologyNode,
} from "@widgets/integration/finance-infra-visualization";
import { FinanceInfraCanvasProvider } from "@widgets/integration/finance-canvas-provider";

import type { FC, PropsWithChildren } from "react";


const FinanceInfraVisualization: FC<PropsWithChildren> = ({
    children,
}) => {
    const { isPending, isError, error, data: topology } = useFinanceProjectTopology({ includeTelemetry: false });
    const { panelRef, triggerRef, isDrawerHidden, revealPanel } = useTraceDrawer();

    return (
        <>
            {children}
            <RenderTopologyFx isError={isError} isPending={isPending} error={error} topology={topology}>
                {(protectedTopology) => (
                    <FinanceInfraCanvasProvider topology={protectedTopology}>
                        <Disclosure ref={panelRef} className="mt-4">
                            <Disclosure.Trigger ref={triggerRef}>
                                <TraceStatusLine />
                            </Disclosure.Trigger>
                            <Disclosure.Content>
                                <TraceSelectorBar />
                                <FinanceInfraCanvasShell>
                                    <FinanceInfraCanvasEdgeLayer>
                                        {(connection) => (
                                            <FlowEdge key={connection.key} connection={connection} />
                                        )}
                                    </FinanceInfraCanvasEdgeLayer>
                                    <FinanceInfraCanvasShell.Column>
                                        <FinanceInfraCanvasSection section="client">
                                            <FinanceInfraCanvasSection.Title>
                                                Client
                                            </FinanceInfraCanvasSection.Title>
                                            <FinanceInfraCanvasSection.ClientNodes>
                                                {(node) => (
                                                    <WebClientTopologyNode key={node.id} node={node} />
                                                )}
                                            </FinanceInfraCanvasSection.ClientNodes>
                                        </FinanceInfraCanvasSection>
                                    </FinanceInfraCanvasShell.Column>
                                    <FinanceInfraCanvasShell.Column divided>
                                        <FinanceInfraCanvasSection section="core">
                                            <FinanceInfraCanvasSection.Title>
                                                Services & storage
                                            </FinanceInfraCanvasSection.Title>
                                            <FinanceInfraCanvasSection.CoreRow>
                                                <FinanceInfraCanvasSection.EdgeLane>
                                                    {(lane) => (
                                                        <EdgeLane lane={lane} />
                                                    )}
                                                </FinanceInfraCanvasSection.EdgeLane>
                                                <FinanceInfraCanvasSection.CoreLanes>
                                                    {(lane) => (
                                                        <CoreLane key={lane.id} lane={lane} />
                                                    )}
                                                </FinanceInfraCanvasSection.CoreLanes>
                                            </FinanceInfraCanvasSection.CoreRow>
                                        </FinanceInfraCanvasSection>
                                    </FinanceInfraCanvasShell.Column>
                                    <FinanceInfraCanvasShell.Column divided>
                                        <FinanceInfraCanvasSection section="streaming">
                                            <FinanceInfraCanvasSection.Title>
                                                Kafka
                                            </FinanceInfraCanvasSection.Title>
                                            <FinanceInfraCanvasSection.StreamingChannels>
                                                {(channel) => (
                                                    <DataChannelNode key={channel.id} channel={channel} />
                                                )}
                                            </FinanceInfraCanvasSection.StreamingChannels>
                                        </FinanceInfraCanvasSection>
                                    </FinanceInfraCanvasShell.Column>
                                </FinanceInfraCanvasShell>
                            </Disclosure.Content>
                        </Disclosure>
                        <TraceDrawerBar isHidden={isDrawerHidden} onReveal={revealPanel} />
                    </FinanceInfraCanvasProvider>
                )}
            </RenderTopologyFx>
        </>
    );
};


export { FinanceInfraVisualization };

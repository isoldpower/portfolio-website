import {
    FinanceInfraCanvasEdge,
    FinanceInfraCanvasEdgeLayer,
    FinanceInfraCanvasSection,
    FinanceInfraCanvasShell
} from "@entities/integration/finance-infra";
import { RenderTopologyFx } from "@features/integration/finance-topology";
import { useFinanceProjectTopology } from "@features/integration/finance-tracing";

import {
    CoreLane,
    DataChannelNode,
    EdgeLane,
    WebClientTopologyNode,
} from "@widgets/integration/finance-infra-visualization";
import { FinanceInfraCanvasProvider } from "@widgets/integration/finance-canvas-provider";

import type { FC, PropsWithChildren } from "react";


const FinanceInfraVisualization: FC<PropsWithChildren> = ({
    children,
}) => {
    const { isPending, isError, error, data: topology } = useFinanceProjectTopology({ includeTelemetry: false });

    return (
        <>
            <RenderTopologyFx isError={isError} isPending={isPending} error={error} topology={topology}>
                {(protectedTopology) => (
                    <FinanceInfraCanvasProvider topology={protectedTopology}>
                        <FinanceInfraCanvasShell>
                            <FinanceInfraCanvasEdgeLayer>
                                {(connection) => (
                                    <FinanceInfraCanvasEdge
                                        key={connection.key}
                                        connection={connection}
                                    />
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
                                    <FinanceInfraCanvasSection.Title>Kafka</FinanceInfraCanvasSection.Title>
                                    <FinanceInfraCanvasSection.StreamingChannels>
                                        {(channel) => (
                                            <DataChannelNode key={channel.id} channel={channel} />
                                        )}
                                    </FinanceInfraCanvasSection.StreamingChannels>
                                </FinanceInfraCanvasSection>
                            </FinanceInfraCanvasShell.Column>
                        </FinanceInfraCanvasShell>
                    </FinanceInfraCanvasProvider>
                )}
            </RenderTopologyFx>
            {children}
        </>
    );
};


export { FinanceInfraVisualization };

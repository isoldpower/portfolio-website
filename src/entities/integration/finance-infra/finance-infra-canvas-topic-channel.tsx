import { cn } from "@shared/lib/utilities";
import { useFinanceInfraCanvas } from "./context/use-finance-infra-canvas.ts";
import { FinanceInfraChannelTopicName } from "./topic-channel/finance-infra-channel-topic-name.tsx";
import { FinanceInfraChannelTopic } from "./topic-channel/finance-infra-channel-topic.tsx";

import type { FinanceInfraChannelTopicNameProps } from "./topic-channel/finance-infra-channel-topic-name.tsx";
import type { FinanceInfraChannelTopicProps } from "./topic-channel/finance-infra-channel-topic.tsx";
import type { FinanceTopicChannel } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasTopicChannelProps {
    channel: FinanceTopicChannel;
    children: ReactNode;
}

type FinanceInfraCanvasTopicChannelObject = FC<FinanceInfraCanvasTopicChannelProps> & {
    Topic: FC<FinanceInfraChannelTopicProps>;
    TopicName: FC<FinanceInfraChannelTopicNameProps>;
};

const FinanceInfraCanvasTopicChannel: FinanceInfraCanvasTopicChannelObject = ({ channel, children }) => {
    const { registry, placements } = useFinanceInfraCanvas();
    const placement = placements.get(channel.id);

    return (
        <div
            ref={registry.refFor(channel.id)}
            role="group"
            aria-label={`${channel.title} channel`}
            style={placement === undefined ? undefined : { left: placement.x, top: placement.y }}
            className={cn(
                "absolute flex items-start gap-1 rounded-full border border-foreground/20 p-0.5",
                placement === undefined ? "invisible left-0 top-0" : "transition-[top,left] duration-200"
            )}
        >
            {children}
        </div>
    );
};

FinanceInfraCanvasTopicChannel.Topic = FinanceInfraChannelTopic;
FinanceInfraCanvasTopicChannel.TopicName = FinanceInfraChannelTopicName;
FinanceInfraCanvasTopicChannel.displayName = "FinanceInfraCanvasTopicChannel";

export { FinanceInfraCanvasTopicChannel };
export type { FinanceInfraCanvasTopicChannelProps };

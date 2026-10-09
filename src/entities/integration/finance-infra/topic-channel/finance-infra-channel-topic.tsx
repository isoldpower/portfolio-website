import { cn } from "@shared/lib/utilities";

import { useCanvasNode } from "../context/use-canvas-node.ts";

import type { FinanceInfraEmphasis, FinanceTopologyNode } from "@entities/integration/model";
import type { FC, ReactNode } from "react";


const EMPHASIS_CLASSES: Record<FinanceInfraEmphasis, string> = {
    default: "border-foreground/25",
    active: "border-accent shadow-sm",
    muted: "border-foreground/10 opacity-40",
};

interface FinanceInfraChannelTopicProps {
    topic: FinanceTopologyNode;
    children: ReactNode;
}

const FinanceInfraChannelTopic: FC<FinanceInfraChannelTopicProps> = ({ topic, children }) => {
    const { emphasis, ...bindings } = useCanvasNode(topic.id);

    return (
        <div
            tabIndex={0}
            title={`${topic.name} · ${topic.technology}\n${topic.description}`}
            data-node-id={topic.id}
            data-node-type={topic.type}
            className={cn(
                "relative z-10 flex w-6 items-center justify-center rounded-full border bg-background py-3",
                "outline-none transition-[opacity,border-color,box-shadow] duration-200",
                "focus-visible:ring-2 focus-visible:ring-accent/40",
                EMPHASIS_CLASSES[emphasis]
            )}
            {...bindings}
        >
            {children}
        </div>
    );
};

FinanceInfraChannelTopic.displayName = "FinanceInfraChannelTopic";

export { FinanceInfraChannelTopic };
export type { FinanceInfraChannelTopicProps };

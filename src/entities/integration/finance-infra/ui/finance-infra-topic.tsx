import { cn } from "@shared/lib/utilities";
import { MetaText } from "@shared/ui-toolkit/typography";

import type { FinanceInfraEmphasis } from "../model/types.ts";
import type { FinanceTopologyNode } from "@entities/integration/model";
import type { FC, HTMLAttributes, Ref } from "react";


const EMPHASIS_CLASSES: Record<FinanceInfraEmphasis, string> = {
    default: "border-foreground/25",
    active: "border-accent shadow-sm",
    muted: "border-foreground/10 opacity-40",
};

interface FinanceInfraTopicProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    topic: FinanceTopologyNode;
    emphasis?: FinanceInfraEmphasis;
    ref?: Ref<HTMLDivElement>;
}

const FinanceInfraTopic: FC<FinanceInfraTopicProps> = ({
    topic,
    emphasis = "default",
    className,
    ref,
    ...props
}) => {
    return (
        <div
            ref={ref}
            tabIndex={0}
            title={`${topic.name} · ${topic.technology}\n${topic.description}`}
            data-node-id={topic.id}
            data-node-type={topic.type}
            className={cn(
                "relative z-10 flex w-6 items-center justify-center rounded-full border bg-background py-3",
                "outline-none transition-[opacity,border-color,box-shadow] duration-200",
                "focus-visible:ring-2 focus-visible:ring-accent/40",
                EMPHASIS_CLASSES[emphasis],
                className
            )}
            {...props}
        >
            <MetaText tone="default" className="[writing-mode:vertical-rl] whitespace-nowrap">
                {topic.name}
            </MetaText>
        </div>
    );
};

export { FinanceInfraTopic };
export type { FinanceInfraTopicProps };

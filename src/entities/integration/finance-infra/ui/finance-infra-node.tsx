import { cn } from "@shared/lib/utilities";
import { MetaText, Text } from "@shared/ui-toolkit/typography";

import { resolveNodeIcon } from "../visual-map";

import type { FinanceInfraEmphasis } from "../model/types.ts";
import type { FinanceTopologyNode } from "@entities/integration/model";
import type { FC, HTMLAttributes, Ref } from "react";


const EMPHASIS_CLASSES: Record<FinanceInfraEmphasis, string> = {
    default: "border-foreground/15",
    active: "border-accent shadow-sm",
    muted: "border-foreground/10 opacity-40",
};

interface FinanceInfraNodeProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    node: FinanceTopologyNode;
    emphasis?: FinanceInfraEmphasis;
    ref?: Ref<HTMLDivElement>;
}

const FinanceInfraNode: FC<FinanceInfraNodeProps> = ({
    node,
    emphasis = "default",
    className,
    ref,
    ...props
}) => {
    const NodeIcon = resolveNodeIcon(node.type);

    return (
        <div
            ref={ref}
            tabIndex={0}
            title={node.description}
            data-node-id={node.id}
            data-node-type={node.type}
            className={cn(
                "relative z-10 flex min-w-0 items-center gap-2 rounded-md border bg-background px-2 py-1.5",
                "outline-none transition-[opacity,border-color,box-shadow] duration-200",
                "focus-visible:ring-2 focus-visible:ring-accent/40",
                EMPHASIS_CLASSES[emphasis],
                className
            )}
            {...props}
        >
            <NodeIcon size={14} className="shrink-0 text-muted" />
            <div className="min-w-0">
                <Text as="div" size="xs" weight="semibold" leading="tight" truncate>
                    {node.name}
                </Text>
                <MetaText as="div" truncate>
                    {node.technology}
                </MetaText>
            </div>
        </div>
    );
};

export { FinanceInfraNode };
export type { FinanceInfraNodeProps };

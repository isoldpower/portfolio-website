import { cn } from "@shared/lib/utilities";

import { FinanceInfraTraceDrawerArrow } from "./trace-drawer/finance-infra-trace-drawer-arrow.tsx";
import { FinanceInfraTraceDrawerDot } from "./trace-drawer/finance-infra-trace-drawer-dot.tsx";
import { FinanceInfraTraceDrawerHeadline } from "./trace-drawer/finance-infra-trace-drawer-headline.tsx";
import { FinanceInfraTraceDrawerHint } from "./trace-drawer/finance-infra-trace-drawer-hint.tsx";

import type { FinanceInfraTraceDrawerHintProps } from "./trace-drawer/finance-infra-trace-drawer-hint.tsx";
import type { FC, ReactNode } from "react";


interface FinanceInfraCanvasTraceDrawerProps {
    isHidden: boolean;
    onReveal: () => void;
    children: ReactNode;
}

type FinanceInfraCanvasTraceDrawerObject = FC<FinanceInfraCanvasTraceDrawerProps> & {
    Dot: FC;
    Headline: FC;
    Hint: FC<FinanceInfraTraceDrawerHintProps>;
    Arrow: FC;
};

const FinanceInfraCanvasTraceDrawer: FinanceInfraCanvasTraceDrawerObject = ({ isHidden, onReveal, children }) => (
    <div className="pointer-events-none sticky bottom-0 z-30 -mx-4 h-0">
        <div className="-translate-y-full overflow-hidden">
            <button
                type="button"
                onClick={onReveal}
                aria-hidden={isHidden}
                tabIndex={isHidden ? -1 : 0}
                className={cn(
                    "flex w-full cursor-pointer items-center gap-3 rounded-t-xl border border-b-0 border-foreground/10",
                    "bg-background/95 px-4 py-3 text-left text-sm shadow-[0_-4px_16px_-8px_rgb(0_0_0/0.15)] backdrop-blur",
                    "outline-none transition-transform duration-300 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/40",
                    isHidden ? "translate-y-full" : "pointer-events-auto translate-y-0"
                )}
            >
                {children}
            </button>
        </div>
    </div>
);

FinanceInfraCanvasTraceDrawer.Dot = FinanceInfraTraceDrawerDot;
FinanceInfraCanvasTraceDrawer.Headline = FinanceInfraTraceDrawerHeadline;
FinanceInfraCanvasTraceDrawer.Hint = FinanceInfraTraceDrawerHint;
FinanceInfraCanvasTraceDrawer.Arrow = FinanceInfraTraceDrawerArrow;
FinanceInfraCanvasTraceDrawer.displayName = "FinanceInfraCanvasTraceDrawer";

export { FinanceInfraCanvasTraceDrawer };
export type { FinanceInfraCanvasTraceDrawerProps };

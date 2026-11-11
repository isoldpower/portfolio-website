import { cn } from "@shared/lib/utilities";

import { INITIAL_FRAME_VARIABLES } from "./constants.ts";
import { JourneyStageFooter } from "./stage/journey-stage-footer.tsx";
import { JourneyStageHeader } from "./stage/journey-stage-header.tsx";
import { JourneyStageHint } from "./stage/journey-stage-hint.tsx";
import { JourneyStagePlayer } from "./stage/journey-stage-player.tsx";
import { JourneyStageShade } from "./stage/journey-stage-shade.tsx";
import { JourneyStageSkipLink } from "./stage/journey-stage-skip-link.tsx";
import { JourneyStageStatus } from "./stage/journey-stage-status.tsx";

import type { JourneyStageFooterProps } from "./stage/journey-stage-footer.tsx";
import type { JourneyStageHeaderProps } from "./stage/journey-stage-header.tsx";
import type { JourneyStageHintProps } from "./stage/journey-stage-hint.tsx";
import type { JourneyStagePlayerProps } from "./stage/journey-stage-player.tsx";
import type { JourneyStageShadeProps } from "./stage/journey-stage-shade.tsx";
import type { JourneyStageSkipLinkProps } from "./stage/journey-stage-skip-link.tsx";
import type { JourneyStageStatusProps } from "./stage/journey-stage-status.tsx";
import type { FC, HTMLAttributes, Ref } from "react";


type JourneyStageProps = HTMLAttributes<HTMLDivElement> & {
    ref?: Ref<HTMLDivElement>;
};

type JourneyStageObject = FC<JourneyStageProps> & {
    Shade: FC<JourneyStageShadeProps>;
    Header: FC<JourneyStageHeaderProps>;
    Player: FC<JourneyStagePlayerProps>;
    Status: FC<JourneyStageStatusProps>;
    Footer: FC<JourneyStageFooterProps>;
    Hint: FC<JourneyStageHintProps>;
    SkipLink: FC<JourneyStageSkipLinkProps>;
};

const JourneyStage: JourneyStageObject = ({ className, children, ...props }) => {
    return (
        <div role="region" className={cn("relative w-full", className)} {...props}>
            <div
                data-journey="frame"
                data-direction="forward"
                className="relative h-[calc(760px*var(--journey-fit))] w-full"
                style={INITIAL_FRAME_VARIABLES}
            >
                <div
                    className={cn(
                        "absolute top-0 left-0 h-190 w-[calc(100%/var(--journey-fit))] origin-top-left",
                        "scale-(--journey-fit) overflow-hidden bg-background px-[9.8%] py-8 font-mono text-accent"
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

JourneyStage.Shade = JourneyStageShade;
JourneyStage.Header = JourneyStageHeader;
JourneyStage.Player = JourneyStagePlayer;
JourneyStage.Status = JourneyStageStatus;
JourneyStage.Footer = JourneyStageFooter;
JourneyStage.Hint = JourneyStageHint;
JourneyStage.SkipLink = JourneyStageSkipLink;
JourneyStage.displayName = "JourneyStage";

export { JourneyStage };
export type { JourneyStageProps };

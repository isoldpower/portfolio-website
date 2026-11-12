import type { FC, ReactNode } from "react";


interface ScrollRailTrackProps {
    children: ReactNode;
}

const ScrollRailTrack: FC<ScrollRailTrackProps> = ({ children }) => {
    return (
        <div className="flex flex-col gap-[3px] border-x border-dashed border-foreground/20 px-[3px]">
            {children}
        </div>
    );
};

ScrollRailTrack.displayName = "ScrollRailTrack";

export { ScrollRailTrack };
export type { ScrollRailTrackProps };

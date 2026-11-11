import type { FC, ReactNode } from "react";


interface JourneyOverlayTitleProps {
    children: ReactNode;
}

const JourneyOverlayTitle: FC<JourneyOverlayTitleProps> = ({ children }) => {
    return (
        <p className="m-0 mb-9.5 text-[1.75rem] leading-[1.3] font-bold tracking-[10px] md:text-[2.375rem]">
            {children}
        </p>
    );
};

JourneyOverlayTitle.displayName = "JourneyOverlayTitle";

export { JourneyOverlayTitle };
export type { JourneyOverlayTitleProps };

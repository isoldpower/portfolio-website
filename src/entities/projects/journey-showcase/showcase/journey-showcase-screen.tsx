import { cn } from "@shared/lib/utilities";

import { PIXEL_FRAME } from "../constants.ts";

import type { FC } from "react";


interface JourneyShowcaseScreenProps {
    marker: string;
    src: string;
    alt: string;
    width: number;
    height: number;
    isHidden?: boolean;
}

const JourneyShowcaseScreen: FC<JourneyShowcaseScreenProps> = ({
    marker,
    src,
    alt,
    width,
    height,
    isHidden = false
}) => {
    return (
        <img
            data-journey-shot={marker}
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className={cn(
                "absolute inset-0 block size-full object-contain [image-rendering:pixelated] saturate-[.65] contrast-[.96]",
                isHidden && "opacity-0"
            )}
            style={PIXEL_FRAME}
        />
    );
};

JourneyShowcaseScreen.displayName = "JourneyShowcaseScreen";

export { JourneyShowcaseScreen };
export type { JourneyShowcaseScreenProps };

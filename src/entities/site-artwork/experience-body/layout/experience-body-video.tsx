import { cn } from "@shared/lib/utilities";

import type { FC, Ref, VideoHTMLAttributes } from "react";


type ExperienceBodyVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "children"> & {
    src: string;
    ref?: Ref<HTMLVideoElement>;
};

const ExperienceBodyVideo: FC<ExperienceBodyVideoProps> = ({ className, ...props }) => {
    return (
        <figure
            className={cn(
                "relative col-span-12 aspect-2/1 self-start overflow-hidden",
                "border border-rule bg-background max-sm:w-full max-sm:max-w-125 max-sm:justify-self-center",
                "max-sm:@container-size sm:col-span-4 sm:aspect-auto sm:self-stretch lg:col-span-3 lg:col-start-10"
            )}
        >
            <video
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className={cn(
                    "absolute top-1/2 left-1/2 h-[100cqw] w-[100cqh] -translate-1/2 rotate-90 object-cover",
                    "sm:inset-0 sm:size-full sm:translate-none sm:rotate-none",
                    className
                )}
                {...props}
            />
        </figure>
    );
};

ExperienceBodyVideo.displayName = "ExperienceBodyVideo";

export { ExperienceBodyVideo };
export type { ExperienceBodyVideoProps };

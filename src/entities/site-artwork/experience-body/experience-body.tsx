import { cn } from "@shared/lib/utilities";

import { ExperienceBodyHeader } from "./layout/experience-body-header.tsx";
import { ExperienceBodyVideo } from "./layout/experience-body-video.tsx";

import type { ExperienceBodyHeaderProps } from "./layout/experience-body-header.tsx";
import type { ExperienceBodyVideoProps } from "./layout/experience-body-video.tsx";
import type { FC, HTMLAttributes } from "react";


type ExperienceBodyProps = HTMLAttributes<HTMLElement>;

type ExperienceBodyObject = FC<ExperienceBodyProps> & {
    Header: FC<ExperienceBodyHeaderProps>;
    Video: FC<ExperienceBodyVideoProps>;
};

const ExperienceBody: ExperienceBodyObject = ({ className, ...props }) => {
    return (
        <section
            className={cn("relative z-10 grid grid-cols-12 gap-x-gutter gap-y-7", className)}
            {...props}
        />
    );
};

ExperienceBody.Header = ExperienceBodyHeader;
ExperienceBody.Video = ExperienceBodyVideo;
ExperienceBody.displayName = "ExperienceBody";

export { ExperienceBody };
export type { ExperienceBodyProps };

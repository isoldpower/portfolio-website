import { cn } from "@shared/lib/utilities";

import type { FC, ImgHTMLAttributes } from "react";


type ProjectCardImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "children"> & {
    src: string;
    alt: string;
};

const ProjectCardImage: FC<ProjectCardImageProps> = ({ alt, className, ...props }) => {
    return (
        <img
            alt={alt}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 75rem) 22rem, (min-width: 40rem) 50vw, 100vw"
            className={cn("block size-full object-cover object-top saturate-[.8]", className)}
            {...props}
        />
    );
};

ProjectCardImage.displayName = "ProjectCardImage";

export { ProjectCardImage };
export type { ProjectCardImageProps };

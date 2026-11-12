import { cn } from "@shared/lib/utilities";

import type { FC, ImgHTMLAttributes } from "react";


type ProjectArticleImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "children"> & {
    src: string;
    alt: string;
};

const ProjectArticleImage: FC<ProjectArticleImageProps> = ({ alt, className, ...props }) => {
    return (
        <img
            alt={alt}
            loading="lazy"
            decoding="async"
            className={cn("block h-auto max-h-[70dvh] w-full object-contain", className)}
            {...props}
        />
    );
};

ProjectArticleImage.displayName = "ProjectArticleImage";

export { ProjectArticleImage };
export type { ProjectArticleImageProps };

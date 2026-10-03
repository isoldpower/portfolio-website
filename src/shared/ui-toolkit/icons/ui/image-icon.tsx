import { proxiedImageUrl } from "@shared/lib/utilities";

import type { ImgHTMLAttributes } from "react";


type ImageIconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "title"> & {
    src: string;
    title: string;
    size?: number;
    important?: boolean;
};

function ImageIcon({
    src,
    title,
    size = 16,
    important = false,
    ...props
}: ImageIconProps) {
    return (
        <img
            src={proxiedImageUrl(src)}
            alt={title}
            title={title}
            width={size}
            height={size}
            loading={important ? "eager" : "lazy"}
            {...props}
        />
    );
}

export { ImageIcon };
export type { ImageIconProps };

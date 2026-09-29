import type { ImgHTMLAttributes } from "react";


type OverrideIconProps = ImgHTMLAttributes<HTMLImageElement> & {
    width?: number | string;
    height?: number | string;
    size?: number;
    important?: boolean;
}

type IconProps = OverrideIconProps & {
    src: string;
    title: string;
};

function Icon({
    src,
    title,
    important = true,
    ...props
}: IconProps) {
    return (
        <img
            loading={important ? "eager" : "lazy"}
            src={src}
            alt={title}
            title={title}
            {...props}
        />
    );
}

export { Icon };
export type { OverrideIconProps, IconProps };
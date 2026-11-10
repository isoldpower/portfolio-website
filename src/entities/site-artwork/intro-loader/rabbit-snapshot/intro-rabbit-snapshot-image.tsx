import { cn } from "@shared/lib/utilities";

import type { FC, ImgHTMLAttributes, Ref } from "react";


type IntroRabbitSnapshotImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
    ref?: Ref<HTMLImageElement>;
    src: string;
    width: number;
    height: number;
    filter: string;
    isRevealed: boolean;
};

const IntroRabbitSnapshotImage: FC<IntroRabbitSnapshotImageProps> = ({
    src,
    width,
    height,
    filter,
    isRevealed,
    className,
    style,
    ...props
}) => {
    return (
        <img
            src={src}
            alt=""
            width={width}
            height={height}
            className={cn("absolute bottom-0 left-0 max-w-none", className)}
            style={{
                ...style,
                width,
                height,
                filter,
                clipPath: isRevealed ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
            }}
            {...props}
        />
    );
};

IntroRabbitSnapshotImage.displayName = "IntroRabbitSnapshotImage";

export { IntroRabbitSnapshotImage };
export type { IntroRabbitSnapshotImageProps };

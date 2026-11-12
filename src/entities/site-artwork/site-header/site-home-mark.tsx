import { cn } from "@shared/lib/utilities";

import type { ImgHTMLAttributes } from "react";


type SiteHomeMarkProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

function SiteHomeMark({
    className,
    ...props
}: SiteHomeMarkProps) {
    return (
        <img
            src="/icons/icon-transparent.svg"
            alt=""
            width={32}
            height={32}
            draggable={false}
            className={cn(
                "block size-7 [image-rendering:pixelated] lg:size-8",
                "transition-[filter] duration-150 ease-[steps(2)] hover:drop-shadow-[0_0_6px_var(--color-accent)]",
                className
            )}
            {...props}
        />
    );
}

export { SiteHomeMark };
export type { SiteHomeMarkProps };

import { cn } from "@shared/lib/utilities";

import type { FC, ImgHTMLAttributes } from "react";


type AboutBodyPortraitProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "children"> & {
    src: string;
    alt: string;
};

const AboutBodyPortrait: FC<AboutBodyPortraitProps> = ({ className, alt, ...props }) => {
    return (
        <figure
            className={cn(
                "col-span-12 self-start max-md:order-2 md:col-span-5 lg:col-span-4 lg:row-span-2",
                "border border-rule"
            )}
        >
            <img
                alt={alt}
                sizes="(min-width: 75rem) 33vw, (min-width: 50.625rem) 42vw, 100vw"
                loading="lazy"
                decoding="async"
                className={cn(
                    "block aspect-[280/221] w-full object-cover",
                    className
                )}
                {...props}
            />
        </figure>
    );
};

AboutBodyPortrait.displayName = "AboutBodyPortrait";

export { AboutBodyPortrait };
export type { AboutBodyPortraitProps };

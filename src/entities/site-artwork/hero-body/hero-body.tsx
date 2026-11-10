import { cn } from "@shared/lib/utilities";

import { HeroBodyArtworkColumn } from "./layout/hero-body-artwork-column.tsx";
import { HeroBodyTextColumn } from "./layout/hero-body-text-column.tsx";

import type { HeroBodyArtworkColumnProps } from "./layout/hero-body-artwork-column.tsx";
import type { HeroBodyTextColumnProps } from "./layout/hero-body-text-column.tsx";
import type { FC, HTMLAttributes } from "react";


type HeroBodyProps = HTMLAttributes<HTMLElement>;

type HeroBodyObject = FC<HeroBodyProps> & {
    TextColumn: FC<HeroBodyTextColumnProps>;
    ArtworkColumn: FC<HeroBodyArtworkColumnProps>;
};

const HeroBody: HeroBodyObject = ({ className, ...props }) => {
    return (
        <section
            className={cn("grid grid-cols-12 gap-x-gutter", className)}
            {...props}
        />
    );
};

HeroBody.TextColumn = HeroBodyTextColumn;
HeroBody.ArtworkColumn = HeroBodyArtworkColumn;
HeroBody.displayName = "HeroBody";

export { HeroBody };
export type { HeroBodyProps };

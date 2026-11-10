import { cn } from "@shared/lib/utilities";

import { HeroTitleKicker } from "./title/hero-title-kicker.tsx";
import { HeroTitleName } from "./title/hero-title-name.tsx";

import type { HeroTitleKickerProps } from "./title/hero-title-kicker.tsx";
import type { HeroTitleNameProps } from "./title/hero-title-name.tsx";
import type { FC, HTMLAttributes } from "react";


type HeroTitleProps = HTMLAttributes<HTMLElement>;

type HeroTitleObject = FC<HeroTitleProps> & {
    Kicker: FC<HeroTitleKickerProps>;
    Name: FC<HeroTitleNameProps>;
};

const HeroTitle: HeroTitleObject = ({ className, ...props }) => {
    return (
        <hgroup className={cn("flex flex-col items-start", className)} {...props} />
    );
};

HeroTitle.Kicker = HeroTitleKicker;
HeroTitle.Name = HeroTitleName;
HeroTitle.displayName = "HeroTitle";

export { HeroTitle };
export type { HeroTitleProps };

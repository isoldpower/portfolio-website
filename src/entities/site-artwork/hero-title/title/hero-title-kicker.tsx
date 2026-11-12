import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { FC, HTMLAttributes } from "react";


type HeroTitleKickerProps = Omit<HTMLAttributes<HTMLElement>, "children">;

const HeroTitleKicker: FC<HeroTitleKickerProps> = ({ className, ...props }) => {
    return (
        <Text as="p" family="mono" size="md" className={cn("tracking-[0.02em]", className)} {...props}>
            _t(hero.kicker)
        </Text>
    );
};

HeroTitleKicker.displayName = "HeroTitleKicker";

export { HeroTitleKicker };
export type { HeroTitleKickerProps };

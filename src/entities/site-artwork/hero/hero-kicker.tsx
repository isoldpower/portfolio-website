import { cn } from "@shared/lib/utilities";
import { Text } from "@shared/ui-toolkit/typography";

import type { HTMLAttributes } from "react";


type HeroKickerProps = Omit<HTMLAttributes<HTMLElement>, "children">;

function HeroKicker({
    className,
    ...props
}: HeroKickerProps) {
    return (
        <Text as="p" family="mono" size="md" className={cn("tracking-[0.02em]", className)} {...props}>
            _t(hero.kicker)
        </Text>
    );
}

export { HeroKicker };
export type { HeroKickerProps };

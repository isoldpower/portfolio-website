import { cn } from "@shared/lib/utilities";
import { DisplayText } from "@shared/ui-toolkit/typography";

import type { HTMLAttributes } from "react";


type HeroTitleProps = Omit<HTMLAttributes<HTMLElement>, "children">;

function HeroTitle({
    className,
    ...props
}: HeroTitleProps) {
    return (
        <DisplayText
            as="h1"
            className={cn("mt-5 max-md:text-[5.5rem] md:max-lg:text-[6.875rem]", className)}
            {...props}
        >
            _t(hero.first_name)
            <br />
            _t(hero.last_name)
        </DisplayText>
    );
}

export { HeroTitle };
export type { HeroTitleProps };

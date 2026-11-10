import { cn } from "@shared/lib/utilities";
import { DisplayText } from "@shared/ui-toolkit/typography";

import type { FC, HTMLAttributes, Ref } from "react";


type HeroTitleNameProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
    ref?: Ref<HTMLElement>;
};

const HeroTitleName: FC<HeroTitleNameProps> = ({ className, ...props }) => {
    return (
        <DisplayText
            as="h1"
            className={cn(
                "mt-5 max-xs:text-[4.5rem] xs:max-md:text-[5.5rem] md:max-lg:text-[6.875rem]",
                className
            )}
            {...props}
        >
            _t(hero.first_name)
            <br />
            _t(hero.last_name)
        </DisplayText>
    );
};

HeroTitleName.displayName = "HeroTitleName";

export { HeroTitleName };
export type { HeroTitleNameProps };

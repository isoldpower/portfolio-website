import { Fragment } from "react";
import { HERO_ROLES } from "../../model";

import type { HeroRole } from "../../model";
import type { FC, ReactNode } from "react";


interface HeroIndexModeListProps {
    children: (role: HeroRole, index: number) => ReactNode;
}

const HeroIndexModeList: FC<HeroIndexModeListProps> = ({ children }) => {
    return (
        <span>
            {HERO_ROLES.map((role, index) => {
                return (
                    <Fragment key={role}>
                        {index > 0 && (
                            <span aria-hidden="true">{" | "}</span>
                        )}
                        {children(role, index)}
                    </Fragment>
                );
            })}
        </span>
    );
};

HeroIndexModeList.displayName = "HeroIndexModeList";

export { HeroIndexModeList };
export type { HeroIndexModeListProps };

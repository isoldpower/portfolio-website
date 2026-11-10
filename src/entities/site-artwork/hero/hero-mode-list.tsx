import { Fragment } from "react";

import { HERO_ROLES } from "../model";

import type { HeroRole } from "../model";
import type { ReactNode } from "react";


interface HeroModeListProps {
    children: (role: HeroRole, index: number) => ReactNode;
}

function HeroModeList({ children }: HeroModeListProps) {
    return (
        <span>
            {HERO_ROLES.map((role, index) => (
                <Fragment key={role}>
                    {index > 0 ? <span aria-hidden="true">{" | "}</span> : null}
                    {children(role, index)}
                </Fragment>
            ))}
        </span>
    );
}

export { HeroModeList };
export type { HeroModeListProps };

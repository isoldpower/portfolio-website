import { Fragment } from "react";

import { PlainText } from "@shared/ui-toolkit/typography";

import { HERO_ROLES } from "../../model";

import type { HeroRole } from "../../model";
import type { FC, ReactNode } from "react";


interface HeroIndexModeListProps {
    children: (role: HeroRole, index: number) => ReactNode;
}

const HeroIndexModeList: FC<HeroIndexModeListProps> = ({ children }) => {
    return (
        <PlainText>
            {HERO_ROLES.map((role, index) => {
                return (
                    <Fragment key={role}>
                        {index > 0 && (
                            <PlainText aria-hidden="true">{" | "}</PlainText>
                        )}
                        {children(role, index)}
                    </Fragment>
                );
            })}
        </PlainText>
    );
};

HeroIndexModeList.displayName = "HeroIndexModeList";

export { HeroIndexModeList };
export type { HeroIndexModeListProps };

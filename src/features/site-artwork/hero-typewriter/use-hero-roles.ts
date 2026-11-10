import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { HERO_ROLES } from "@entities/site-artwork/model";


type UseHeroRolesReturn = readonly string[];

const useHeroRoles = (): UseHeroRolesReturn => {
    const { t, i18n } = useTranslation();

    return useMemo(() => {
        return HERO_ROLES.map((role) => t(`hero.roles.${role}`));
    }, [t, i18n.language]);
};

export { useHeroRoles };
export type { UseHeroRolesReturn };

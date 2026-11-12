import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { IntroNames } from "../types.ts";


type UseIntroNamesReturn = IntroNames;

const useIntroNames = (): UseIntroNamesReturn => {
    const { t } = useTranslation();
    const firstName = t("hero.first_name");
    const lastName = t("hero.last_name");

    return useMemo(() => {
        return { firstName, lastName };
    }, [firstName, lastName]);
};

export { useIntroNames };
export type { UseIntroNamesReturn };

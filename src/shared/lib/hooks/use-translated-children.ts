import { Children, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { ParseKeys } from "i18next";
import type { ReactNode } from "react";


const TRANSLATION_MARKER_PATTERN = /_t\(\s*([^()\s]+)\s*\)/g;

interface UseTranslatedChildrenParams {
    children: ReactNode;
    values?: Record<string, string | number>;
}

type UseTranslatedChildrenReturn = ReactNode;

const useTranslatedChildren = ({
    children,
    values
}: UseTranslatedChildrenParams): UseTranslatedChildrenReturn => {
    const { t, i18n } = useTranslation();

    const translateMarker = useCallback((marker: string, key: string): string => {
        if (!i18n.exists(key)) {
            return marker;
        }

        const translated: unknown = t(
            key as ParseKeys,
            { replace: values, returnObjects: true }
        );

        return typeof translated === "string"
            ? translated
            : marker;
    }, [t, i18n, values]);

    const translateChild = useCallback((child: ReactNode): ReactNode => {
        if (typeof child !== "string" || !i18n.isInitialized) {
            return child;
        }

        return child.replace(TRANSLATION_MARKER_PATTERN, translateMarker);
    }, [i18n, translateMarker]);

    return useMemo(() => {
        return Children.map(children, translateChild);
    }, [ children, translateChild ]);
};

export { useTranslatedChildren };
export type { UseTranslatedChildrenParams, UseTranslatedChildrenReturn };

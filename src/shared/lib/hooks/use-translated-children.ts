import { Children, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { TOptions } from "i18next";
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

        const translateRuntimeKey = t as unknown as (runtimeKey: string, options: TOptions) => unknown;
        const translated = translateRuntimeKey(key, { replace: values, returnObjects: true });

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

    const mergeTextChildren = useCallback((mergedChildren: ReactNode[], child: ReactNode): ReactNode[] => {
        const isTextChild = typeof child === "string" || typeof child === "number";
        const previousChild = mergedChildren.at(-1);

        if (isTextChild && typeof previousChild === "string") {
            mergedChildren[mergedChildren.length - 1] = previousChild + String(child);
        } else {
            mergedChildren.push(isTextChild ? String(child) : child);
        }

        return mergedChildren;
    }, []);

    return useMemo(() => {
        const mergedChildren = Children.toArray(children).reduce<ReactNode[]>(mergeTextChildren, []);
        const translatedChildren = mergedChildren.map(translateChild);

        return translatedChildren.length === 1 ? translatedChildren[0] : translatedChildren;
    }, [children, mergeTextChildren, translateChild]);
};

export { useTranslatedChildren };
export type { UseTranslatedChildrenParams, UseTranslatedChildrenReturn };

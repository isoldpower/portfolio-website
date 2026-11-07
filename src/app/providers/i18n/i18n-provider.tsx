import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { createInternationalizationInstance } from "./create-instance.ts";

import type { InternationalizationProviderProps } from "./types.ts";
import type { FC } from "react";


const InternationalizationProvider: FC<InternationalizationProviderProps> = ({
    children,
    locale
}) => {
    const [ instance ] = useState(() => {
        return createInternationalizationInstance(locale);
    });

    useEffect(() => {
        if (instance.language !== locale) {
            void instance.changeLanguage(locale);
        }
    }, [ instance, locale ]);

    return (
        <I18nextProvider i18n={instance}>
            {children}
        </I18nextProvider>
    );
};

export { InternationalizationProvider };

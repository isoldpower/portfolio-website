import { useCallback } from "react";


interface LoadSignals {
    areFontsReady: boolean;
    isPageLoaded: boolean;
}

type UseLoadSignalsReturn = () => LoadSignals;

const useLoadSignals = (): UseLoadSignalsReturn => {
    return useCallback(() => {
        const signals: LoadSignals = {
            areFontsReady: false,
            isPageLoaded: document.readyState === "complete",
        };

        void document.fonts.ready.then(() => {
            signals.areFontsReady = true;
        });
        if (!signals.isPageLoaded) {
            window.addEventListener("load", () => {
                signals.isPageLoaded = true;
            }, { once: true });
        }

        return signals;
    }, []);
};

export { useLoadSignals };
export type { LoadSignals, UseLoadSignalsReturn };

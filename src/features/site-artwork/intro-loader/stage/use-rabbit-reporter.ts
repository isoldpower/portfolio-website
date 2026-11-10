import { useMemo } from "react";

import { useIntroStage } from "./use-intro-stage.ts";


interface UseRabbitReporterReturn {
    reportProgress: (progress: number) => void;
    markReady: (canvas: HTMLCanvasElement) => void;
}

const ignore = (): void => {
    return undefined;
};

const useRabbitReporter = (): UseRabbitReporterReturn => {
    const store = useIntroStage();

    return useMemo(() => {
        return {
            reportProgress: store?.reportRabbitProgress ?? ignore,
            markReady: store?.markRabbitReady ?? ignore,
        };
    }, [store]);
};

export { useRabbitReporter };
export type { UseRabbitReporterReturn };

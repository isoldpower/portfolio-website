import { useCallback, useMemo, useState } from "react";

import { useLoadingProgress } from "./use-loading-progress.ts";

import type { FrameLoaderStage } from "@entities/integrations/project-frame";


interface UseFrameLoadingParams {
    src: string | undefined;
    address: string;
}

interface UseFrameLoadingReturn {
    progress: number;
    stage: FrameLoaderStage;
    host: string;
    isHidden: boolean;
    isSettled: boolean;
    handleLoad: () => void;
}

const useFrameLoading = ({ src, address }: UseFrameLoadingParams): UseFrameLoadingReturn => {
    const [loadedSrc, setLoadedSrc] = useState<string | undefined>(undefined);
    const loadingProgress = useLoadingProgress({ key: src, isLoaded: src !== undefined && loadedSrc === src });

    const frameHost = useMemo(() => {
        try {
            return new URL(address).host;
        } catch {
            return address;
        }
    }, [address]);

    const handleLoad = useCallback(() => {
        if (src !== undefined) {
            setLoadedSrc(src);
        }
    }, [src]);

    return useMemo(() => {
        return {
            ...loadingProgress,
            stage: src === undefined ? "waiting" : loadingProgress.stage,
            host: frameHost,
            handleLoad,
        };
    }, [loadingProgress, src, frameHost, handleLoad]);
};

export { useFrameLoading };
export type { UseFrameLoadingParams, UseFrameLoadingReturn };

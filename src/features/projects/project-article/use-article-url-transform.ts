import { useCallback } from "react";
import { defaultUrlTransform } from "react-markdown";


type UseArticleUrlTransformReturn = (url: string) => string;

const MEDIA_REFERENCE_PATTERN = /^(video|photo):[\w-]+$/;

const useArticleUrlTransform = (): UseArticleUrlTransformReturn => {
    return useCallback((url: string) => {
        return MEDIA_REFERENCE_PATTERN.test(url)
            ? url
            : defaultUrlTransform(url);
    }, []);
};

export { useArticleUrlTransform };
export type { UseArticleUrlTransformReturn };

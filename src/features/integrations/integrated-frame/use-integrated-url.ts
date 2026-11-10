import { useMemo } from "react";


interface UseIntegratedUrlParams<T extends object = object> {
    url: string;
    params: T;
}

function useIntegratedUrl<T extends object>({
    url,
    params,
}: UseIntegratedUrlParams<T>): string{
    return useMemo<string>(() => {
        const sourceUrl = new URL(url);
        const targetParams = new URLSearchParams(Object.entries(params));

        for (const [key, value] of targetParams) {
            sourceUrl.searchParams.set(key, value);
        }

        return sourceUrl.toString();
    }, [url, params]);
}

export { useIntegratedUrl };

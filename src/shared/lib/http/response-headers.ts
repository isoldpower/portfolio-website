type ResponseHeaders = Record<string, string>;

const PAGE_CACHE_HEADERS: ResponseHeaders = {
    "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=600",
};

const CROSS_ORIGIN_ISOLATION_HEADERS: ResponseHeaders = {
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
};

const MISSING_RESOURCE_CACHE = "public, max-age=60";

export { CROSS_ORIGIN_ISOLATION_HEADERS, MISSING_RESOURCE_CACHE, PAGE_CACHE_HEADERS };
export type { ResponseHeaders };

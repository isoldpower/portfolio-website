/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly CLIENT_SANITY_PROJECT_ID: string;
    readonly CLIENT_SANITY_DATASET: string;
    readonly CLIENT_SANITY_API_VERSION: string;
    readonly CLIENT_SANITY_USE_CDN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

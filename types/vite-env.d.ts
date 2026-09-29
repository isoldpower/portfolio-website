/// <reference types="vite/client" />

// Declare CLIENT_-prefixed env variables here
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ImportMetaEnv {}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

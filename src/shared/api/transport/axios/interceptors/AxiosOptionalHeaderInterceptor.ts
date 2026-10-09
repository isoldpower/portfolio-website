import { BaseAxiosInterceptor } from "./BaseAxiosInterceptor.ts";

import type { InternalAxiosRequestConfig } from "axios";


class AxiosOptionalHeaderInterceptor extends BaseAxiosInterceptor {
    readonly #header: string;
    readonly #value: string | null;

    constructor(header: string, value?: string) {
        super();
        this.#header = header;
        this.#value = value === undefined || value === "" ? null : value;
    }

    interceptRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        if (this.#value === null) {
            config.headers.delete(this.#header);
        } else {
            config.headers.set(this.#header, this.#value);
        }

        return config;
    }
}

export { AxiosOptionalHeaderInterceptor };

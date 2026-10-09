import { CORRELATION_HEADER } from "../../headers";
import { BaseAxiosInterceptor } from "./BaseAxiosInterceptor.ts";

import type { InternalAxiosRequestConfig } from "axios";


class AxiosCorrelationInterceptor extends BaseAxiosInterceptor {
    interceptRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        config.headers.set(CORRELATION_HEADER, crypto.randomUUID());

        return config;
    }
}

export { AxiosCorrelationInterceptor };

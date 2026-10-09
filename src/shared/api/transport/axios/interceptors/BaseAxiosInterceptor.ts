import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { AxiosInterceptor } from "./types.ts";


abstract class BaseAxiosInterceptor implements AxiosInterceptor {
    abstract interceptRequest(
        config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

    interceptResponseSuccess(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> {
        return response;
    }

    interceptResponseFault(error: unknown): Promise<never> {
        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
}

export { BaseAxiosInterceptor };

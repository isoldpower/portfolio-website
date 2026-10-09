import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";


interface AxiosInterceptor {
    interceptRequest(
        config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;

    interceptResponseSuccess(
        response: AxiosResponse
    ): AxiosResponse | Promise<AxiosResponse>;

    interceptResponseFault(error: unknown): Promise<never>;
}

export type { AxiosInterceptor };

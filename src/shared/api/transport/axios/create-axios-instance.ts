import axios from "axios";

import { ACCEPT_HEADER, JSON_CONTENT_TYPE, SANDBOX_HEADER } from "../headers";
import { REQUEST_TIMEOUT_MESSAGE, REQUEST_TIMEOUT_MS } from "./config.ts";
import { AxiosCorrelationInterceptor, AxiosOptionalHeaderInterceptor } from "./interceptors";

import type { AxiosInstance } from "axios";
import type { AxiosInterceptor } from "./interceptors";


interface AxiosInstanceOptions {
    baseUrl: string;
    sandbox?: string;
}

function registerInterceptor(axiosInstance: AxiosInstance, interceptor: AxiosInterceptor): void {
    axiosInstance.interceptors.request.use(
        (config) => interceptor.interceptRequest(config)
    );
    axiosInstance.interceptors.response.use(
        (response) => interceptor.interceptResponseSuccess(response),
        (error: unknown) => interceptor.interceptResponseFault(error)
    );
}

function createAxiosInstance({ baseUrl, sandbox }: AxiosInstanceOptions): AxiosInstance {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: REQUEST_TIMEOUT_MS,
        timeoutErrorMessage: REQUEST_TIMEOUT_MESSAGE,
        withCredentials: false,
        headers: { [ACCEPT_HEADER]: JSON_CONTENT_TYPE },
    });
    const interceptors: AxiosInterceptor[] = [
        new AxiosCorrelationInterceptor(),
        new AxiosOptionalHeaderInterceptor(SANDBOX_HEADER, sandbox),
    ];

    interceptors.forEach((interceptor) => {
        registerInterceptor(axiosInstance, interceptor);
    });

    return axiosInstance;
}

export { createAxiosInstance };
export type { AxiosInstanceOptions };

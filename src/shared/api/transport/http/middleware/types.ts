import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { ApiResponseHeaders } from "../../headers";


interface HttpRequestContext {
    axiosInstance: AxiosInstance;
    requestConfiguration: AxiosRequestConfig;
}

interface HttpResponseResult {
    data: unknown;
    headers: ApiResponseHeaders;
    status: number;
}

type HttpRequestHandler = (requestContext: HttpRequestContext) => Promise<HttpResponseResult>;

interface HttpMiddleware {
    name: string;
    handle: (
        requestContext: HttpRequestContext,
        sendNext: HttpRequestHandler
    ) => Promise<HttpResponseResult>;
}

export type { HttpMiddleware, HttpRequestContext, HttpRequestHandler, HttpResponseResult };

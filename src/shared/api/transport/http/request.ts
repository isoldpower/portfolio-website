import { applyMiddlewares, errorTranslationMiddleware, sendAxiosRequest } from "./middleware";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { HttpMiddleware, HttpRequestHandler } from "./middleware";


const DEFAULT_MIDDLEWARES: HttpMiddleware[] = [
    errorTranslationMiddleware,
];

function createRequestSender(middlewares: HttpMiddleware[] = DEFAULT_MIDDLEWARES): HttpRequestHandler {
    return applyMiddlewares(middlewares, sendAxiosRequest);
}

const sendThroughDefaultMiddlewares = createRequestSender();

async function request<TResponse>(
    axiosInstance: AxiosInstance,
    requestConfiguration: AxiosRequestConfig
): Promise<TResponse> {
    const responseResult = await sendThroughDefaultMiddlewares({
        axiosInstance,
        requestConfiguration
    });

    return responseResult.data as TResponse;
}

export { createRequestSender, DEFAULT_MIDDLEWARES, request };

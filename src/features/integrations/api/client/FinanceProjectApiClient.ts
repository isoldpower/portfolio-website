import { request } from "@shared/api";

import { FinanceTraceStream } from "./FinanceTraceStream.ts";
import { INTEGRATION_API_PATHS } from "../paths.ts";
import { SANDBOX_QUERY_PARAM, SESSION_QUERY_PARAM } from "../config.ts";

import type { AxiosInstance } from "axios";
import type { FinanceTopologyDto } from "../types.ts";


interface FinanceProjectApiClientOptions {
    sandbox?: string;
}

class FinanceProjectApiClient {
    readonly #axiosInstance: AxiosInstance;
    readonly #sandbox: string | undefined;

    constructor(axiosInstance: AxiosInstance, { sandbox }: FinanceProjectApiClientOptions = {}) {
        this.#axiosInstance = axiosInstance;
        this.#sandbox = sandbox === "" ? undefined : sandbox;
    }

    getTopology(signal?: AbortSignal): Promise<FinanceTopologyDto> {
        return request<FinanceTopologyDto>(this.#axiosInstance, {
            method: "GET",
            url: INTEGRATION_API_PATHS.topology,
            signal,
        });
    }

    streamTraces(session: string, signal?: AbortSignal): FinanceTraceStream {
        const url = new URL(this.#axiosInstance.getUri({
            url: INTEGRATION_API_PATHS.stream,
            params: {
                [SESSION_QUERY_PARAM]: session,
                [SANDBOX_QUERY_PARAM]: this.#sandbox,
            },
        }));

        return new FinanceTraceStream(url, session, signal);
    }
}

export { FinanceProjectApiClient };
export type { FinanceProjectApiClientOptions };

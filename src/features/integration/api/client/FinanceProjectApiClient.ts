import { FinanceProjectApiError } from "./FinanceProjectApiError.ts";
import { FinanceTraceStream } from "./FinanceTraceStream.ts";
import { INTEGRATION_API_PATHS } from "../paths.ts";
import { SANDBOX_HEADER, SANDBOX_QUERY_PARAM } from '../config.ts';

import type { FinanceTopologyDto } from "../types.ts";


interface FinanceProjectApiClientOptions {
    baseUrl: string;
    sandbox?: string;
}

class FinanceProjectApiClient {
    readonly #baseUrl: string;
    readonly #sandbox: string | undefined;

    constructor({ baseUrl, sandbox }: FinanceProjectApiClientOptions) {
        this.#baseUrl = baseUrl;
        this.#sandbox = sandbox === "" ? undefined : sandbox;
    }

    async getTopology(signal?: AbortSignal): Promise<FinanceTopologyDto> {
        const response = await fetch(
            this.#urlOf(INTEGRATION_API_PATHS.topology),
            { signal, headers: this.#headers() }
        );

        if (!response.ok) {
            throw new FinanceProjectApiError(
                INTEGRATION_API_PATHS.topology,
                response.status
            );
        }

        return await response.json() as FinanceTopologyDto;
    }

    streamTraces(session: string, signal?: AbortSignal): FinanceTraceStream {
        const url = this.#urlOf(INTEGRATION_API_PATHS.stream);
        url.searchParams.set("session", session);

        if (this.#sandbox !== undefined) {
            url.searchParams.set(SANDBOX_QUERY_PARAM, this.#sandbox);
        }

        return new FinanceTraceStream(url, session, signal);
    }

    #headers(): HeadersInit {
        return this.#sandbox
            ? { [SANDBOX_HEADER]: this.#sandbox }
            : {};
    }

    #urlOf(path: string): URL {
        return new URL(
            `${this.#baseUrl.replace(/\/+$/, "")}${path}`
        );
    }
}

export { FinanceProjectApiClient };
export type { FinanceProjectApiClientOptions };

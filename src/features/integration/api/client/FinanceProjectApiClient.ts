import { FinanceProjectApiError } from "./FinanceProjectApiError.ts";
import { FinanceTraceStream } from "./FinanceTraceStream.ts";

import type { FinanceTopologyDto } from "../types.ts";


const TOPOLOGY_PATH = "/api/v1/demo/topology";
const TRACES_STREAM_PATH = "/api/v1/demo/traces/stream";

class FinanceProjectApiClient {
    readonly #baseUrl: string;

    constructor(baseUrl: string) {
        this.#baseUrl = baseUrl;
    }

    async getTopology(signal?: AbortSignal): Promise<FinanceTopologyDto> {
        const response = await fetch(this.#urlOf(TOPOLOGY_PATH), { signal });

        if (!response.ok) {
            throw new FinanceProjectApiError(TOPOLOGY_PATH, response.status);
        }

        return await response.json() as FinanceTopologyDto;
    }

    streamTraces(session: string, signal?: AbortSignal): FinanceTraceStream {
        const url = this.#urlOf(TRACES_STREAM_PATH);

        url.searchParams.set("session", session);

        return new FinanceTraceStream(url, session, signal);
    }

    #urlOf(path: string): URL {
        return new URL(`${this.#baseUrl.replace(/\/+$/, "")}${path}`);
    }
}

export { FinanceProjectApiClient };

import { FinanceTraceStreamError } from "./FinanceTraceStreamError.ts";

import type { FinanceSpanDto, FinanceTraceEventDto } from "../types.ts";


const SPAN_EVENT = "span";

interface PendingRead {
    resolve: (result: IteratorResult<FinanceTraceEventDto>) => void;
    reject: (reason: Error) => void;
}

class FinanceTraceStream implements AsyncIterableIterator<FinanceTraceEventDto> {
    readonly session: string;
    readonly #source: EventSource;
    readonly #buffer: FinanceTraceEventDto[] = [];
    #pending: PendingRead | null = null;
    #failure: FinanceTraceStreamError | null = null;
    #isFinished = false;

    constructor(url: URL, session: string, signal?: AbortSignal) {
        this.session = session;
        this.#source = new EventSource(url);
        this.#source.addEventListener(SPAN_EVENT, this.#receiveSpan.bind(this));
        this.#source.addEventListener("open", this.#receiveOpen.bind(this));
        this.#source.addEventListener("error", this.#receiveError.bind(this));
        signal?.addEventListener("abort", this.close.bind(this), { once: true });
    }

    get isClosed(): boolean {
        return this.#isFinished;
    }

    [Symbol.asyncIterator](): this {
        return this;
    }

    next(): Promise<IteratorResult<FinanceTraceEventDto>> {
        const event = this.#buffer.shift();

        if (event !== undefined) {
            return Promise.resolve({ done: false, value: event });
        }

        if (this.#failure !== null) {
            return Promise.reject(this.#failure);
        }

        if (this.#isFinished) {
            return Promise.resolve({ done: true, value: undefined });
        }

        return new Promise(this.#park.bind(this));
    }

    return(): Promise<IteratorResult<FinanceTraceEventDto>> {
        this.close();

        return Promise.resolve({ done: true, value: undefined });
    }

    close(): void {
        if (this.#isFinished) {
            return;
        }

        this.#isFinished = true;
        this.#source.close();
        this.#pending?.resolve({ done: true, value: undefined });
        this.#pending = null;
    }

    #park(
        resolve: PendingRead["resolve"],
        reject: PendingRead["reject"]
    ): void {
        this.#pending = { resolve, reject };
    }

    #push(event: FinanceTraceEventDto): void {
        if (this.#isFinished) {
            return;
        }

        if (this.#pending === null) {
            this.#buffer.push(event);
        } else {
            this.#pending.resolve({ done: false, value: event });
            this.#pending = null;
        }
    }

    #receiveSpan(event: MessageEvent<string>): void {
        this.#push({ type: "span", span: JSON.parse(event.data) as FinanceSpanDto });
    }

    #receiveOpen(): void {
        this.#push({ type: "open" });
    }

    #receiveError(): void {
        if (this.#source.readyState !== EventSource.CLOSED || this.#isFinished) {
            return;
        }

        this.#failure = new FinanceTraceStreamError(this.session);
        this.#isFinished = true;
        this.#pending?.reject(this.#failure);
        this.#pending = null;
    }
}

export { FinanceTraceStream };

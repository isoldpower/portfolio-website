const NOTHING_TYPED_YET = undefined;

class InputQueue {
    readonly #encoder = new TextEncoder();
    readonly #bytes: number[] = [];

    constructor() {
        this.read = this.read.bind(this);
    }

    push(data: string | Uint8Array): void {
        const bytes = typeof data === "string" ? this.#encoder.encode(data) : data;
        this.#bytes.push(...bytes);
    }

    read(): number | undefined {
        return this.#bytes.length === 0 ? NOTHING_TYPED_YET : this.#bytes.shift();
    }

    clear(): void {
        this.#bytes.length = 0;
    }
}

export { InputQueue };

const ESCAPE = 0x1b;
const DEVICE_CONTROL_START = 0x50;
const STRING_TERMINATOR_END = 0x5c;

type FilterState = "text" | "escape" | "controlString" | "controlStringEscape";

class ControlStringFilter {
    #state: FilterState = "text";

    push(byte: number, output: number[]): void {
        switch (this.#state) {
            case "text":
                this.#readText(byte, output);
                break;
            case "escape":
                this.#readEscape(byte, output);
                break;
            case "controlString":
                this.#readControlString(byte);
                break;
            case "controlStringEscape":
                this.#readControlStringEscape(byte);
                break;
        }
    }

    #readText(byte: number, output: number[]): void {
        if (byte === ESCAPE) {
            this.#state = "escape";
            return;
        }

        output.push(byte);
    }

    #readEscape(byte: number, output: number[]): void {
        if (byte === DEVICE_CONTROL_START) {
            this.#state = "controlString";
            return;
        }

        this.#state = byte === ESCAPE ? "escape" : "text";
        output.push(ESCAPE);
        if (byte !== ESCAPE) {
            output.push(byte);
        }
    }

    #readControlString(byte: number): void {
        if (byte === ESCAPE) {
            this.#state = "controlStringEscape";
        }
    }

    #readControlStringEscape(byte: number): void {
        if (byte === STRING_TERMINATOR_END) {
            this.#state = "text";
        } else if (byte !== ESCAPE) {
            this.#state = "controlString";
        }
    }
}

export { ControlStringFilter };

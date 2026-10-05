import type { TerminalSurface } from "../model/types.ts";


const LETTER_KEY = /^Key([A-Z])$/;
const LAST_ASCII_CODE = 0x7f;
const COMPOSITION_KEY_CODE = 229;
const CAPTURING: AddEventListenerOptions = { capture: true };

function isPlainPress(event: KeyboardEvent): boolean {
    return !event.ctrlKey && !event.altKey && !event.metaKey
        && !event.isComposing && event.keyCode !== COMPOSITION_KEY_CODE;
}

function isNonLatinCharacter(key: string): boolean {
    return key.length === 1 && key.charCodeAt(0) > LAST_ASCII_CODE;
}

class LetterKeyForwarder {
    readonly #element: HTMLElement;
    readonly #send: (data: string) => void;
    readonly #onKeyDown = this.#handleKeyDown.bind(this);

    constructor(terminal: TerminalSurface, send: (data: string) => void) {
        this.#element = terminal.element;
        this.#send = send;
    }

    attach(): this {
        this.#element.addEventListener("keydown", this.#onKeyDown, CAPTURING);
        return this;
    }

    detach(): void {
        this.#element.removeEventListener("keydown", this.#onKeyDown, CAPTURING);
    }

    #handleKeyDown(event: KeyboardEvent): void {
        const letter = LETTER_KEY.exec(event.code);
        if (letter === null || !isPlainPress(event) || !isNonLatinCharacter(event.key)) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        this.#send(event.shiftKey ? letter[1] : letter[1].toLowerCase());
    }
}

export { LetterKeyForwarder };

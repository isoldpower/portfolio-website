import type { TerminalSurface } from "../model/types.ts";


const TERMINAL_INPUT_SELECTOR = "textarea";
const INPUT_MODE_ATTRIBUTE = "inputmode";
const NO_VIRTUAL_KEYBOARD = "none";

function setVirtualKeyboard(terminal: TerminalSurface, isEnabled: boolean): void {
    const input = terminal.element.querySelector(TERMINAL_INPUT_SELECTOR);
    if (isEnabled) {
        input?.removeAttribute(INPUT_MODE_ATTRIBUTE);
    } else {
        input?.setAttribute(INPUT_MODE_ATTRIBUTE, NO_VIRTUAL_KEYBOARD);
    }
}

export { setVirtualKeyboard };

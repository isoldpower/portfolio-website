import type { TerminalSurface } from "../model/types.ts";


function setVirtualKeyboard(terminal: TerminalSurface, isEnabled: boolean): void {
    const input = terminal.element.querySelector("textarea");

    if (isEnabled) {
        input?.removeAttribute("inputmode");
    } else {
        input?.setAttribute(
            "inputmode",
            "none"
        );
    }
}

export { setVirtualKeyboard };

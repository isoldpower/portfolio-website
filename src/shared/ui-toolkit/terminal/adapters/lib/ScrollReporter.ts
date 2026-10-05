import type { TerminalSurface } from "../model/types.ts";


const WHEEL_UP = 64;
const WHEEL_DOWN = 65;
const WHEEL_LEFT = 66;
const WHEEL_RIGHT = 67;
const CELLS_PER_STEP = 3;
const SGR_ENCODING = "sgr";
const VIEWPORT_ROW_SELECTOR = ".term-row:not(.term-scrollback-row)";
const CELL_WIDTH_PROPERTY = "--term-cell-width";
const ROW_HEIGHT_PROPERTY = "--term-row-height";

type ScrollAxis = "across" | "down";
type ReportSink = (data: string) => void;

interface TerminalCell {
    column: number;
    row: number;
    width: number;
    height: number;
}

function reportOf(button: number, cell: TerminalCell): string {
    return `\x1b[<${button};${cell.column};${cell.row}M`;
}

function clamp(value: number, max: number): number {
    return Math.min(Math.max(value, 1), max);
}

function readPixels(element: HTMLElement, property: string): number {
    return parseFloat(element.style.getPropertyValue(property)) || 0;
}

class ScrollReporter {
    readonly #terminal: TerminalSurface;
    readonly #send: ReportSink;
    readonly #travelled: Record<ScrollAxis, number> = { across: 0, down: 0 };

    constructor(terminal: TerminalSurface, send: ReportSink) {
        this.#terminal = terminal;
        this.#send = send;
    }

    get isListening(): boolean {
        const bridge = this.#terminal.bridge;
        if (bridge === null || (bridge.mouseTracking?.() ?? 0) === 0) {
            return false;
        }

        const encoding = bridge.mouseEncoding?.() ?? (bridge.mouseSgr?.() === true ? SGR_ENCODING : null);
        return encoding === SGR_ENCODING;
    }

    get pageHeight(): number {
        return readPixels(this.#terminal.element, ROW_HEIGHT_PROPERTY) * this.#terminal.rows;
    }

    cellAt(clientX: number, clientY: number): TerminalCell | null {
        const { element, cols, rows } = this.#terminal;
        const viewportRow = element.querySelector(VIEWPORT_ROW_SELECTOR);
        const width = readPixels(element, CELL_WIDTH_PROPERTY);
        const height = readPixels(element, ROW_HEIGHT_PROPERTY);
        if (viewportRow === null || width <= 0 || height <= 0) {
            return null;
        }

        const origin = viewportRow.getBoundingClientRect();
        return {
            column: clamp(Math.floor((clientX - origin.left) / width) + 1, cols),
            row: clamp(Math.floor((clientY - origin.top) / height) + 1, rows),
            width,
            height,
        };
    }

    travel(across: number, down: number, cell: TerminalCell): void {
        this.#travelled.across += across;
        this.#travelled.down += down;

        this.#report("across", CELLS_PER_STEP * cell.width, WHEEL_LEFT, WHEEL_RIGHT, cell);
        this.#report("down", CELLS_PER_STEP * cell.height, WHEEL_UP, WHEEL_DOWN, cell);
    }

    forget(): void {
        this.#travelled.across = 0;
        this.#travelled.down = 0;
    }

    #report(axis: ScrollAxis, pixelsPerStep: number, towardsStart: number, towardsEnd: number, cell: TerminalCell): void {
        const steps = Math.trunc(this.#travelled[axis] / pixelsPerStep);
        if (steps === 0) {
            return;
        }

        this.#travelled[axis] -= steps * pixelsPerStep;
        const button = steps < 0 ? towardsStart : towardsEnd;
        this.#send(reportOf(button, cell).repeat(Math.abs(steps)));
    }
}

export { ScrollReporter };
export type { TerminalCell };

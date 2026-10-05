import { ScrollReporter } from "./ScrollReporter.ts";

import type { TerminalCell } from "./ScrollReporter.ts";
import type { TerminalSurface } from "../model/types.ts";


const PIXELS_PER_LINE_STEP = 16;
const DRAG_THRESHOLD_PIXELS = 8;
const FLICK_FRICTION = 0.95;
const FLICK_STOPPING_SPEED = 0.02;
const MIN_ELAPSED_MILLISECONDS = 1;

const CAPTURING_ACTIVE: AddEventListenerOptions = {
    capture: true,
    passive: false
};
const CAPTURING_PASSIVE: AddEventListenerOptions = {
    capture: true,
    passive: true
};

interface TouchDrag {
    cell: TerminalCell;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    lastTime: number;
    speedX: number;
    speedY: number;
    isDragging: boolean;
}

interface Flick {
    cell: TerminalCell;
    speedX: number;
    speedY: number;
    time: number;
    frame: number;
}

function pixelsOf(delta: number, deltaMode: number, pageSize: number): number {
    if (deltaMode === WheelEvent.DOM_DELTA_LINE) {
        return delta * PIXELS_PER_LINE_STEP;
    }
    if (deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return delta * pageSize;
    }

    return delta;
}

class ScrollForwarder {
    readonly #element: HTMLElement;
    readonly #reporter: ScrollReporter;
    readonly #onWheel = this.#handleWheel.bind(this);
    readonly #onTouchStart = this.#handleTouchStart.bind(this);
    readonly #onTouchMove = this.#handleTouchMove.bind(this);
    readonly #onTouchEnd = this.#handleTouchEnd.bind(this);
    readonly #onTouchCancel = this.#handleTouchCancel.bind(this);
    readonly #onFlickFrame = this.#carryFlick.bind(this);
    #drag: TouchDrag | null = null;
    #flick: Flick | null = null;

    constructor(terminal: TerminalSurface, send: (data: string) => void) {
        this.#element = terminal.element;
        this.#reporter = new ScrollReporter(terminal, send);
    }

    attach(): this {
        this.#element.addEventListener("wheel", this.#onWheel, CAPTURING_ACTIVE);
        this.#element.addEventListener("touchstart", this.#onTouchStart, CAPTURING_PASSIVE);
        this.#element.addEventListener("touchmove", this.#onTouchMove, CAPTURING_ACTIVE);
        this.#element.addEventListener("touchend", this.#onTouchEnd, CAPTURING_ACTIVE);
        this.#element.addEventListener("touchcancel", this.#onTouchCancel, CAPTURING_PASSIVE);
        return this;
    }

    detach(): void {
        this.#stopFlick();
        this.#drag = null;
        this.#element.removeEventListener("wheel", this.#onWheel, CAPTURING_ACTIVE);
        this.#element.removeEventListener("touchstart", this.#onTouchStart, CAPTURING_PASSIVE);
        this.#element.removeEventListener("touchmove", this.#onTouchMove, CAPTURING_ACTIVE);
        this.#element.removeEventListener("touchend", this.#onTouchEnd, CAPTURING_ACTIVE);
        this.#element.removeEventListener("touchcancel", this.#onTouchCancel, CAPTURING_PASSIVE);
    }

    #handleWheel(event: WheelEvent): void {
        if (!this.#reporter.isListening) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        const cell = this.#reporter.cellAt(event.clientX, event.clientY);
        if (cell === null) {
            return;
        }

        const isShiftedRoll = event.shiftKey && event.deltaX === 0;
        const across = isShiftedRoll ? event.deltaY : event.deltaX;
        const down = isShiftedRoll ? 0 : event.deltaY;
        const pageHeight = this.#reporter.pageHeight;

        this.#reporter.travel(
            pixelsOf(across, event.deltaMode, pageHeight),
            pixelsOf(down, event.deltaMode, pageHeight),
            cell,
        );
    }

    #handleTouchStart(event: TouchEvent): void {
        this.#stopFlick();
        this.#drag = null;
        if (event.touches.length !== 1 || !this.#reporter.isListening) {
            return;
        }

        const touch = event.touches[0];
        const cell = this.#reporter.cellAt(touch.clientX, touch.clientY);
        if (cell === null) {
            return;
        }

        this.#reporter.forget();
        this.#drag = {
            cell,
            startX: touch.clientX,
            startY: touch.clientY,
            lastX: touch.clientX,
            lastY: touch.clientY,
            lastTime: event.timeStamp,
            speedX: 0,
            speedY: 0,
            isDragging: false,
        };
    }

    #handleTouchMove(event: TouchEvent): void {
        const drag = this.#drag;
        if (drag === null || event.touches.length !== 1) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const touch = event.touches[0];
        const distance = Math.hypot(touch.clientX - drag.startX, touch.clientY - drag.startY);
        if (!drag.isDragging && distance < DRAG_THRESHOLD_PIXELS) {
            return;
        }

        drag.isDragging = true;
        const across = drag.lastX - touch.clientX;
        const down = drag.lastY - touch.clientY;
        const elapsed = Math.max(event.timeStamp - drag.lastTime, MIN_ELAPSED_MILLISECONDS);
        drag.speedX = across / elapsed;
        drag.speedY = down / elapsed;
        drag.lastX = touch.clientX;
        drag.lastY = touch.clientY;
        drag.lastTime = event.timeStamp;

        this.#reporter.travel(across, down, drag.cell);
    }

    #handleTouchEnd(event: TouchEvent): void {
        const drag = this.#drag;
        this.#drag = null;
        if (drag === null || !drag.isDragging) {
            return;
        }

        event.preventDefault();
        this.#flick = {
            cell: drag.cell,
            speedX: drag.speedX,
            speedY: drag.speedY,
            time: performance.now(),
            frame: requestAnimationFrame(this.#onFlickFrame),
        };
    }

    #handleTouchCancel(): void {
        this.#drag = null;
    }

    #carryFlick(time: number): void {
        const flick = this.#flick;
        if (flick === null) {
            return;
        }

        const elapsed = time - flick.time;
        flick.time = time;
        flick.speedX *= FLICK_FRICTION;
        flick.speedY *= FLICK_FRICTION;

        if (Math.hypot(flick.speedX, flick.speedY) < FLICK_STOPPING_SPEED || !this.#reporter.isListening) {
            this.#flick = null;
            return;
        }

        this.#reporter.travel(flick.speedX * elapsed, flick.speedY * elapsed, flick.cell);
        flick.frame = requestAnimationFrame(this.#onFlickFrame);
    }

    #stopFlick(): void {
        if (this.#flick !== null) {
            cancelAnimationFrame(this.#flick.frame);
            this.#flick = null;
        }
    }
}

export { ScrollForwarder };

import type { IntroPhase, IntroSnapshot, IntroTargetRole } from "../types.ts";


class IntroStageStore {
    #snapshot: IntroSnapshot;
    #rabbitProgress = 0;
    #rabbitCanvas: HTMLCanvasElement | null = null;

    readonly #listeners = new Set<() => void>();
    readonly #targets = new Map<IntroTargetRole, HTMLElement>();

    constructor(isEnabled: boolean) {
        this.#snapshot = { phase: isEnabled ? "load" : "done", isStaggered: false };
    }

    readonly subscribe = (listener: () => void): (() => void) => {
        this.#listeners.add(listener);
        return () => {
            this.#listeners.delete(listener);
        };
    };

    readonly getSnapshot = (): IntroSnapshot => {
        return this.#snapshot;
    };

    readonly setPhase = (phase: IntroPhase, isStaggered = false): void => {
        if (this.#snapshot.phase === phase && this.#snapshot.isStaggered === isStaggered) {
            return;
        }

        this.#snapshot = { phase, isStaggered };
        this.#listeners.forEach((listener) => {
            listener();
        });
    };

    readonly reportRabbitProgress = (progress: number): void => {
        this.#rabbitProgress = Math.max(this.#rabbitProgress, Math.min(1, progress));
    };

    readonly markRabbitReady = (canvas: HTMLCanvasElement): void => {
        if (this.#rabbitCanvas) {
            return;
        }

        this.#rabbitCanvas = canvas;
        this.#rabbitProgress = 1;
    };

    readonly getRabbitProgress = (): number => {
        return this.#rabbitProgress;
    };

    readonly getRabbitCanvas = (): HTMLCanvasElement | null => {
        return this.#rabbitCanvas;
    };

    readonly registerTarget = (role: IntroTargetRole, element: HTMLElement | null): void => {
        if (element) {
            this.#targets.set(role, element);
        } else {
            this.#targets.delete(role);
        }
    };

    readonly getTarget = (role: IntroTargetRole): HTMLElement | null => {
        return this.#targets.get(role) ?? null;
    };
}

export { IntroStageStore };

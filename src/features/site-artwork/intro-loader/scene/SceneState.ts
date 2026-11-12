import type { RabbitSnapshot, SceneView, SequenceStep } from "../types.ts";


type Listener<Payload> = (payload: Payload) => void;

class SceneState {
    rabbitCanvas: HTMLCanvasElement | null = null;
    shot: RabbitSnapshot | null = null;

    #view: SceneView;

    readonly #viewListeners = new Set<Listener<SceneView>>();
    readonly #enterListeners = new Set<Listener<SequenceStep>>();
    readonly #finishListeners = new Set<Listener<boolean>>();

    constructor(view: SceneView) {
        this.#view = view;
    }

    readonly begin = (): void => {
        this.rabbitCanvas = null;
        this.shot = null;
    };

    readonly subscribe = (listener: () => void): (() => void) => {
        return this.#listen(this.#viewListeners, listener);
    };

    readonly onEnter = (listener: Listener<SequenceStep>): (() => void) => {
        return this.#listen(this.#enterListeners, listener);
    };

    readonly onFinish = (listener: Listener<boolean>): (() => void) => {
        return this.#listen(this.#finishListeners, listener);
    };

    readonly getView = (): SceneView => {
        return this.#view;
    };

    readonly updateView = (patch: Partial<SceneView>): void => {
        this.#view = { ...this.#view, ...patch };
        this.#emit(this.#viewListeners, this.#view);
    };

    readonly enter = (step: SequenceStep): void => {
        this.#emit(this.#enterListeners, step);
        if (this.#view.step !== step) {
            this.updateView({ step });
        }
    };

    readonly finish = (isStaggered: boolean): void => {
        this.#emit(this.#finishListeners, isStaggered);
        this.updateView({ isFinished: true });
    };

    readonly #listen = <Payload>(
        listeners: Set<Listener<Payload>>,
        listener: Listener<Payload>
    ): (() => void) => {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    };

    readonly #emit = <Payload>(
        listeners: Set<Listener<Payload>>,
        payload: Payload
    ): void => {
        listeners.forEach((listener) => {
            listener(payload);
        });
    };
}

export { SceneState };

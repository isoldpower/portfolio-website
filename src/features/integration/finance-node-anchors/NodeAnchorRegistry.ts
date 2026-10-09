import type { FinanceInfraAnchor, FinanceInfraAnchorRegistry } from "@entities/integration/model";
import type { RefCallback } from "react";
import type { AnchorListener, AnchorSnapshot } from "./types";


const EMPTY_SNAPSHOT: AnchorSnapshot = new Map();

class NodeAnchorRegistry implements FinanceInfraAnchorRegistry {
    readonly #elements = new Map<string, HTMLElement>();
    readonly #refs = new Map<string, RefCallback<HTMLElement>>();
    readonly #listeners = new Set<AnchorListener>();
    #container: HTMLElement | null = null;
    #observer: ResizeObserver | null = null;
    #frame: number | null = null;
    #snapshot: AnchorSnapshot = EMPTY_SNAPSHOT;

    readonly containerRef: RefCallback<HTMLElement> = (element) => {
        if (element === null) {
            return undefined;
        }

        this.#container = element;
        this.#observer = new ResizeObserver(this.#scheduleMeasure);
        this.#observer.observe(element);

        for (const node of this.#elements.values()) {
            this.#observer.observe(node);
        }

        this.#scheduleMeasure();

        return this.#detachContainer;
    };

    readonly subscribe = (listener: AnchorListener): (() => void) => {
        this.#listeners.add(listener);

        return () => {
            this.#listeners.delete(listener);
        };
    };

    readonly getSnapshot = (): AnchorSnapshot => {
        return this.#snapshot;
    }

    readonly getServerSnapshot = (): AnchorSnapshot => {
        return EMPTY_SNAPSHOT;
    }

    refFor(id: string): RefCallback<HTMLElement> {
        const existing = this.#refs.get(id);

        if (existing !== undefined) {
            return existing;
        }

        const ref: RefCallback<HTMLElement> = (element) => {
            return this.#attachNode(id, element);
        }

        this.#refs.set(id, ref);

        return ref;
    }

    remeasure(): void {
        this.#scheduleMeasure();
    }

    #attachNode(id: string, element: HTMLElement | null): (() => void) | undefined {
        if (element === null) {
            return undefined;
        }

        this.#elements.set(id, element);
        this.#observer?.observe(element);
        this.#scheduleMeasure();

        return () => {
            if (this.#elements.get(id) === element) {
                this.#elements.delete(id);
            }

            this.#observer?.unobserve(element);
            this.#scheduleMeasure();
        };
    }

    readonly #detachContainer = (): void => {
        this.#observer?.disconnect();
        this.#observer = null;
        this.#container = null;

        if (this.#frame !== null) {
            cancelAnimationFrame(this.#frame);
            this.#frame = null;
        }
    };

    readonly #scheduleMeasure = (): void => {
        if (this.#frame === null && this.#container !== null) {
            this.#frame = requestAnimationFrame(this.#measure);
        }
    };

    readonly #measure = (): void => {
        this.#frame = null;

        if (this.#container === null) {
            return;
        }

        const origin = this.#container.getBoundingClientRect();
        const snapshot = new Map<string, FinanceInfraAnchor>();

        for (const [id, element] of this.#elements) {
            snapshot.set(id, this.#anchorOf(element, origin));
        }

        if (this.#isCurrentSnapshot(snapshot)) {
            return;
        }

        this.#snapshot = snapshot;

        for (const listener of this.#listeners) {
            listener();
        }
    };

    #anchorOf(element: HTMLElement, origin: DOMRect): FinanceInfraAnchor {
        const rect = element.getBoundingClientRect();

        return {
            x: rect.left - origin.left,
            y: rect.top - origin.top,
            width: rect.width,
            height: rect.height,
        };
    }

    #isCurrentSnapshot(snapshot: AnchorSnapshot): boolean {
        if (snapshot.size !== this.#snapshot.size) {
            return false;
        }

        for (const [id, anchor] of snapshot) {
            const current = this.#snapshot.get(id);

            if (current === undefined || !this.#isSameAnchor(anchor, current)) {
                return false;
            }
        }

        return true;
    }

    #isSameAnchor(left: FinanceInfraAnchor, right: FinanceInfraAnchor): boolean {
        return left.x === right.x
            && left.y === right.y
            && left.width === right.width
            && left.height === right.height;
    }
}

export { NodeAnchorRegistry };

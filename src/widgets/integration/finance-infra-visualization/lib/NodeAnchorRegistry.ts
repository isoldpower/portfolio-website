import type { FinanceInfraAnchor } from "@entities/integration/finance-infra";
import type { RefCallback } from "react";


type AnchorSnapshot = ReadonlyMap<string, FinanceInfraAnchor>;

type AnchorListener = () => void;

const EMPTY_SNAPSHOT: AnchorSnapshot = new Map();

function anchorOf(element: HTMLElement, origin: DOMRect): FinanceInfraAnchor {
    const rect = element.getBoundingClientRect();

    return {
        x: rect.left - origin.left,
        y: rect.top - origin.top,
        width: rect.width,
        height: rect.height,
    };
}

function isSameAnchor(left: FinanceInfraAnchor, right: FinanceInfraAnchor): boolean {
    return left.x === right.x
        && left.y === right.y
        && left.width === right.width
        && left.height === right.height;
}

function isSameSnapshot(left: AnchorSnapshot, right: AnchorSnapshot): boolean {
    if (left.size !== right.size) {
        return false;
    }

    for (const [id, anchor] of left) {
        const other = right.get(id);

        if (other === undefined || !isSameAnchor(anchor, other)) {
            return false;
        }
    }

    return true;
}

class NodeAnchorRegistry {
    readonly containerRef: RefCallback<HTMLElement> = this.#attachContainer.bind(this);
    readonly subscribe = this.#subscribe.bind(this);
    readonly getSnapshot = this.#getSnapshot.bind(this);
    readonly getServerSnapshot = this.#getServerSnapshot.bind(this);
    readonly #elements = new Map<string, HTMLElement>();
    readonly #refs = new Map<string, RefCallback<HTMLElement>>();
    readonly #listeners = new Set<AnchorListener>();
    #container: HTMLElement | null = null;
    #observer: ResizeObserver | null = null;
    #frame: number | null = null;
    #snapshot: AnchorSnapshot = EMPTY_SNAPSHOT;

    refFor(id: string): RefCallback<HTMLElement> {
        const existing = this.#refs.get(id);

        if (existing !== undefined) {
            return existing;
        }

        const ref: RefCallback<HTMLElement> = this.#attachNode.bind(this, id);

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

        return this.#detachNode.bind(this, id, element);
    }

    #detachNode(id: string, element: HTMLElement): void {
        if (this.#elements.get(id) === element) {
            this.#elements.delete(id);
        }

        this.#observer?.unobserve(element);
        this.#scheduleMeasure();
    }

    #attachContainer(element: HTMLElement | null): (() => void) | undefined {
        if (element === null) {
            return undefined;
        }

        this.#container = element;
        this.#observer = new ResizeObserver(this.#scheduleMeasure.bind(this));
        this.#observer.observe(element);

        for (const node of this.#elements.values()) {
            this.#observer.observe(node);
        }

        this.#scheduleMeasure();

        return this.#detachContainer.bind(this);
    }

    #detachContainer(): void {
        this.#observer?.disconnect();
        this.#observer = null;
        this.#container = null;

        if (this.#frame !== null) {
            cancelAnimationFrame(this.#frame);
            this.#frame = null;
        }
    }

    #scheduleMeasure(): void {
        if (this.#frame === null && this.#container !== null) {
            this.#frame = requestAnimationFrame(this.#measure.bind(this));
        }
    }

    #measure(): void {
        this.#frame = null;

        if (this.#container === null) {
            return;
        }

        const origin = this.#container.getBoundingClientRect();
        const snapshot = new Map<string, FinanceInfraAnchor>();

        for (const [id, element] of this.#elements) {
            snapshot.set(id, anchorOf(element, origin));
        }

        if (isSameSnapshot(snapshot, this.#snapshot)) {
            return;
        }

        this.#snapshot = snapshot;

        for (const listener of this.#listeners) {
            listener();
        }
    }

    #subscribe(listener: AnchorListener): () => void {
        this.#listeners.add(listener);

        return this.#unsubscribe.bind(this, listener);
    }

    #unsubscribe(listener: AnchorListener): void {
        this.#listeners.delete(listener);
    }

    #getSnapshot(): AnchorSnapshot {
        return this.#snapshot;
    }

    #getServerSnapshot(): AnchorSnapshot {
        return EMPTY_SNAPSHOT;
    }
}

export { NodeAnchorRegistry };
export type { AnchorSnapshot };

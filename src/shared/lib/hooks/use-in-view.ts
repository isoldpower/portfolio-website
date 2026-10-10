import { useCallback, useState } from "react";

import type { RefCallback } from "react";


interface UseInViewOptions {
    rootMargin?: string;
}

interface UseInViewReturn<TElement extends Element> {
    ref: RefCallback<TElement>;
    isInView: boolean | null;
}

function useInView<TElement extends Element>({ rootMargin = "0px" }: UseInViewOptions = {}): UseInViewReturn<TElement> {
    const [isInView, setIsInView] = useState<boolean | null>(null);

    const ref = useCallback<RefCallback<TElement>>((element) => {
        if (element === null) {
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry?.isIntersecting ?? false);
        }, { rootMargin });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [rootMargin]);

    return { ref, isInView };
}

export { useInView };
export type { UseInViewOptions, UseInViewReturn };

import { useCallback } from "react";


type UseWordRectReturn = (root: Element | null, word: string) => DOMRect | null;

const useWordRect = (): UseWordRectReturn => {
    const textNodesOf = useCallback((root: Node): Text[] => {
        const collect = (node: Node): Text[] => {
            return node instanceof Text ? [node] : Array.from(node.childNodes).flatMap(collect);
        };
        return collect(root);
    }, []);

    return useCallback((root, word) => {
        if (!root || !word) {
            return null;
        }

        const text = textNodesOf(root).find((node) => node.data.includes(word));
        if (text) {
            const index = text.data.indexOf(word);
            const range = document.createRange();
            range.setStart(text, index);
            range.setEnd(text, index + word.length);

            return range.getBoundingClientRect();
        } else {
            return null;
        }
    }, []);
};

export { useWordRect };
export type { UseWordRectReturn };

import { useCallback, useMemo, useState } from "react";


interface UseRelativeLinesReturn {
    focusedLine: number;
    distanceTo: (line: number) => number;
    focusLine: (line: number) => void;
}

const useRelativeLines = (): UseRelativeLinesReturn => {
    const [focusedLine, setFocusedLine] = useState(0);

    const distanceTo = useCallback((line: number) => {
        return Math.abs(line - focusedLine);
    }, [focusedLine]);

    const focusLine = useCallback((line: number) => {
        setFocusedLine(line);
    }, []);

    return useMemo(() => ({
        focusedLine,
        distanceTo,
        focusLine
    }), [focusedLine, distanceTo, focusLine]);
};

export { useRelativeLines };
export type { UseRelativeLinesReturn };

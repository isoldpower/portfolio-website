import { useMemo } from "react";
import { useDocumentSize } from "@shared/lib/hooks";


type BreakpointKey = "sm" | "md" | "lg";
type BreakpointsMapKey = BreakpointKey | "default";

type BreakpointsRecord = Record<BreakpointKey, number>;

const defaultBreakpoints: BreakpointsRecord = {
    sm: 640,
    md: 810,
    lg: 1200,
};

function useBreakpointsMapping<T>(
    breakpointsMap: Record<BreakpointsMapKey, T>,
    breakpoints: BreakpointsRecord = defaultBreakpoints,
    ssrBreakpoint: BreakpointsMapKey = "lg"
): T {
    const documentSize = useDocumentSize();
    const documentWidth = useMemo(() => {
        return documentSize ? documentSize.width : null;
    }, [documentSize]);

    return useMemo<T>(() => {
        if (documentWidth === null) {
            return breakpointsMap[ssrBreakpoint];
        }

        const sortedBreakpoints = Object.entries(breakpoints).sort(
            ([, widthA], [, widthB]) => widthA - widthB
        ) as [BreakpointKey, number][];

        let activeValue: BreakpointsMapKey = "default";
        for (const [name, breakpointWidth] of sortedBreakpoints) {
            if (documentWidth >= breakpointWidth) {
                activeValue = name;
            } else {
                break;
            }
        }

        return breakpointsMap[activeValue];
    }, [documentWidth, ssrBreakpoint, breakpoints, breakpointsMap]);
}

export { useBreakpointsMapping };
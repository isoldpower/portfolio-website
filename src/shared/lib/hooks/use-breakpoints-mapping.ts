import { useMemo } from "react";

import { useDocumentSize } from "@shared/lib/hooks";


type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type BreakpointsMapKey = BreakpointKey | "default";

type BreakpointsRecord = Record<BreakpointKey, number>;

const defaultBreakpoints: BreakpointsRecord = {
    xs: 360,
    sm: 432,
    md: 768,
    lg: 992,
    xl: 1280,
    "2xl": 1536,
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
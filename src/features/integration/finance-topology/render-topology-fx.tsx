import { Caption, ErrorText } from "@shared/ui-toolkit";

import type { ReactNode } from "react";


type Falsy = false | 0 | "" | null | undefined;

interface RenderTopologyFx<T> {
    children: ((topology: Exclude<T, Falsy>) => ReactNode) | ReactNode;
    topology: T | null;
    isPending: boolean;
    isError: boolean;
    error: { message: string } | null;
}

function RenderTopologyFx<T>({
    isPending,
    isError,
    error,
    topology,
    children
}: RenderTopologyFx<T>) {
    if (isPending) {
        return (
            <Caption>
                Loading the infrastructure map...
            </Caption>
        );
    } else if (isError || !topology) {
        return (
            <ErrorText>
                Couldn't load the infrastructure map: {error?.message ?? 'Anonymous Error'}
            </ErrorText>
        );
    }

    return typeof children === 'function'
        ? children(topology as Exclude<T, Falsy>)
        : children;
}

export { RenderTopologyFx };
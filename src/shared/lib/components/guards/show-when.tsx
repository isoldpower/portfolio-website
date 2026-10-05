import type { ReactNode } from "react";


type Falsy = false | 0 | "" | null | undefined;

interface ShowWhenProps<T> {
    when: T;
    fallback?: ReactNode;
    children: (value: Exclude<T, Falsy>) => ReactNode;
}

function ShowWhen<T>({
    when,
    fallback = null,
    children
}: ShowWhenProps<T>): ReactNode {
    return when ? children(when as Exclude<T, Falsy>) : fallback;
}

export { ShowWhen };
export type { ShowWhenProps };

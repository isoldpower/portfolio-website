import { wrapListItems } from "../lib/wrap-list-items.tsx";

import type { ListItemsOptions } from "../types.ts";
import type { HTMLAttributes } from "react";


type UnorderedListProps = HTMLAttributes<HTMLUListElement> & ListItemsOptions;

function UnorderedList({
    children,
    itemProps,
    ...props
}: UnorderedListProps) {
    return (
        <ul {...props}>
            {wrapListItems({ children, itemProps })}
        </ul>
    );
}

export { UnorderedList };
export type { UnorderedListProps };

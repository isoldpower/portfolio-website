import { wrapListItems } from "../lib/wrap-list-items.tsx";

import type { ListItemsOptions } from "../types.ts";
import type { OlHTMLAttributes } from "react";


type OrderedListProps = OlHTMLAttributes<HTMLOListElement> & ListItemsOptions;

function OrderedList({
    children,
    itemProps,
    ...props
}: OrderedListProps) {
    return (
        <ol {...props}>
            {wrapListItems({ children, itemProps })}
        </ol>
    );
}

export { OrderedList };
export type { OrderedListProps };

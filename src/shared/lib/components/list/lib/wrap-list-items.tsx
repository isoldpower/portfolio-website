import { Children, isValidElement } from "react";

import type { ListItemProps, ListItemsOptions } from "../types.ts";
import type { ReactNode } from "react";


function resolveItemProps(
    itemProps: ListItemsOptions["itemProps"],
    index: number
): ListItemProps | undefined {
    return typeof itemProps === "function" ? itemProps(index) : itemProps;
}

// Empty children are dropped, existing li children are kept as they are,
// and each generated li takes over its child's key.
function wrapListItems({
    children,
    itemProps
}: ListItemsOptions): ReactNode[] {
    return Children.toArray(children).map((child, index) => {
        if (isValidElement(child) && child.type === "li") {
            return child;
        }

        const key = isValidElement(child) && child.key !== null ? child.key : index;

        return (
            <li key={key} {...resolveItemProps(itemProps, index)}>
                {child}
            </li>
        );
    });
}

export { wrapListItems };

import { Children, isValidElement, useCallback } from "react";

import type { ListItemProps, ListItemsOptions } from "../types.ts";
import type { ReactNode } from "react";


function wrapListItems({
    children,
    itemProps
}: ListItemsOptions): ReactNode[] {
    const resolveItemProps = useCallback((
        index: number
    ): ListItemProps | undefined => {
        return typeof itemProps === "function"
            ? itemProps(index)
            : itemProps;
    }, [itemProps]);

    const resolveItemKey = useCallback((
        child: ReactNode,
        index: number
    ): string => {
        return isValidElement(child) && child.key !== null
            ? child.key
            : `list-item-${index.toString()}`;
    }, [itemProps]);

    return Children.toArray(children).map((child, index) => {
        if (isValidElement(child) && child.type === "li") {
            return child;
        }

        return (
            <li
                key={resolveItemKey(child, index)}
                {...resolveItemProps(index)}
            >
                {child}
            </li>
        );
    });
}

export { wrapListItems };

import type { LiHTMLAttributes, ReactNode } from "react";


type ListItemProps = LiHTMLAttributes<HTMLLIElement>;

interface ListItemsOptions {
    children?: ReactNode;
    itemProps?: ListItemProps | ((index: number) => ListItemProps);
}

export type { ListItemProps, ListItemsOptions };

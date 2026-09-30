import { createElement } from "react";

import { cn } from "@shared/lib/utilities";

import { textClass } from "../variants";

import type { HTMLAttributes } from "react";
import type { TextClassOptions } from "../variants";


type TextElement =
    | "span"
    | "div"
    | "p"
    | "label"
    | "strong"
    | "em"
    | "small"
    | "time"
    | "code"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

type TextProps = HTMLAttributes<HTMLElement> & TextClassOptions & {
    as?: TextElement;
    htmlFor?: string;
    dateTime?: string;
};

function Text({
    as = "span",
    size,
    family,
    weight,
    tone,
    tracking,
    leading,
    uppercase,
    truncate,
    className,
    children,
    ...props
}: TextProps) {
    return createElement(
        as,
        {
            className: cn(
                textClass({ size, family, weight, tone, tracking, leading, uppercase, truncate }),
                className
            ),
            ...props,
        },
        children
    );
}

export { Text };
export type { TextProps, TextElement };

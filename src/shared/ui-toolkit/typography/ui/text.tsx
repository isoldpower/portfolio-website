import { createElement } from "react";
import { useTranslatedChildren } from "@shared/lib/hooks";
import { cn } from "@shared/lib/utilities";
import { textClass } from "../variants";

import type { UseTranslatedChildrenParams } from "@shared/lib/hooks";
import type { TextClassOptions } from "../variants";
import type { HTMLAttributes, Ref } from "react";


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
    | "li"
    | "figcaption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";

type TextProps = HTMLAttributes<HTMLElement> & TextClassOptions & {
    ref?: Ref<HTMLElement>;
    as?: TextElement;
    htmlFor?: string;
    dateTime?: string;
    values?: UseTranslatedChildrenParams["values"];
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
    values,
    ...props
}: TextProps) {
    const translatedChildren = useTranslatedChildren({ children, values });

    return createElement(
        as,
        {
            className: cn(
                textClass({ size, family, weight, tone, tracking, leading, uppercase, truncate }),
                className
            ),
            ...props,
        },
        translatedChildren
    );
}

export { Text };
export type { TextProps, TextElement };

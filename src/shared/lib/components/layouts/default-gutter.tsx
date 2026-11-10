import { cn } from "@shared/lib/utilities";
import { createElement } from "react";

import type { BaseHTMLAttributes, FC, HTMLElementType } from "react";


interface DefaultGutterProps extends BaseHTMLAttributes<HTMLDivElement> {
    element?: HTMLElementType;
}

const DefaultGutter: FC<DefaultGutterProps> = ({
    children,
    className,
    element = "div",
    ...props
}) => {
    return createElement(element, {
        ...props,
        children,
        className: cn(
            'flex flex-col w-full box-content mx-auto max-w-7xl',
            'px-margin',
            className
        )
    });
}

export { DefaultGutter };
import { cn } from "@shared/lib/utilities";

import type { FC, ReactNode } from "react";


interface SectionLabelTitleProps {
    text: string;
    typedLength: number;
    children?: ReactNode;
}

const SectionLabelTitle: FC<SectionLabelTitleProps> = ({ text, typedLength, children }) => {
    return (
        <h2
            aria-label={text}
            className={cn(
                "absolute top-0 left-0 m-0 flex items-center",
                "font-sans text-sm leading-5 font-semibold whitespace-pre text-accent md:text-lg"
            )}
        >
            <span aria-hidden="true">
                {text.slice(0, typedLength)}
            </span>
            {children}
            <span aria-hidden="true" className="text-transparent">
                {text.slice(typedLength)}
            </span>
        </h2>
    );
};

SectionLabelTitle.displayName = "SectionLabelTitle";

export { SectionLabelTitle };
export type { SectionLabelTitleProps };

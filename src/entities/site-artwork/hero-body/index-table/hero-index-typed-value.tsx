import type { FC, ReactNode } from "react";


interface HeroIndexTypedValueProps {
    text: string;
    label: string;
    children: ReactNode;
}

const HeroIndexTypedValue: FC<HeroIndexTypedValueProps> = ({
    text,
    label,
    children
}) => {
    return (
        <span
            role="text"
            aria-label={label}
            className="inline-flex items-center font-semibold whitespace-pre text-highlight"
        >
            <span aria-hidden="true">"{text}</span>
            {children}
            <span aria-hidden="true">"</span>
        </span>
    );
};

HeroIndexTypedValue.displayName = "HeroIndexTypedValue";

export { HeroIndexTypedValue };
export type { HeroIndexTypedValueProps };

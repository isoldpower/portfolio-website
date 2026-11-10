import type { ReactNode } from "react";


interface HeroTypedValueProps {
    text: string;
    label: string;
    cursor: ReactNode;
}

function HeroTypedValue({
    text,
    label,
    cursor
}: HeroTypedValueProps) {
    return (
        <span role="text" aria-label={label} className="inline-flex items-center font-semibold whitespace-pre text-highlight">
            <span aria-hidden="true">"{text}</span>
            {cursor}
            <span aria-hidden="true">"</span>
        </span>
    );
}

export { HeroTypedValue };
export type { HeroTypedValueProps };

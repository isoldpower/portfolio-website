import type { FC, ReactNode } from "react";


interface AboutBodyVariableProps {
    type: string;
    name: string;
    value: string;
    children?: ReactNode;
}

const AboutBodyVariable: FC<AboutBodyVariableProps> = ({ type, name, value, children }) => {
    return (
        <span className="flex flex-wrap gap-x-2 pl-[4ch] md:contents">
            <span className="-ml-[4ch] flex whitespace-pre md:contents">
                <span className="pr-2 opacity-70 md:pr-6">
                    {type}
                </span>
                <span className="pr-2 text-accent md:pr-6">
                    {name}
                </span>
                <span aria-hidden="true">=</span>
            </span>
            <span className="min-w-0 wrap-break-word">
                "{value}"{children}
            </span>
        </span>
    );
};

AboutBodyVariable.displayName = "AboutBodyVariable";

export { AboutBodyVariable };
export type { AboutBodyVariableProps };

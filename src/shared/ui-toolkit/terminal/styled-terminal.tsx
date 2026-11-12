import { Terminal } from "@wterm/react";
import { cn } from "@shared/lib/utilities";

import type { TerminalRuntime } from "./adapters";
import type { ComponentProps, FC } from "react";


interface StyledTerminalProps extends ComponentProps<typeof Terminal> {
    terminalRuntime: TerminalRuntime;
}

const StyledTerminal: FC<StyledTerminalProps> = ({
    ref,
    className,
    terminalRuntime: _terminalRuntime,
    ...props
}) => {
    return (
        <Terminal
            ref={ref}
            className={cn(
                "terminal-theme rounded-none border border-accent p-3 shadow-none",
                "transition-[border-color,box-shadow] duration-200 focus-within:border-highlight",
                "focus-within:shadow-[0_0_0_1px_var(--color-highlight),0_0_24px_rgba(102,153,255,0.25)]",
                className
            )}
            {...props}
        />
    );
}

export { StyledTerminal };

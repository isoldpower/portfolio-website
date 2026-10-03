import { Terminal } from "@wterm/react";

import type { TerminalRuntime } from "./adapters";
import type { ComponentProps, FC } from "react";


interface StyledTerminalProps extends ComponentProps<typeof Terminal> {
    terminalRuntime: TerminalRuntime;
}

const StyledTerminal: FC<StyledTerminalProps> = ({
    ref,
    terminalRuntime: _terminalRuntime,
    ...props
}) => {
    return (
        <Terminal ref={ref} {...props} />
    );
}

export { StyledTerminal };

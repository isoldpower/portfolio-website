import { Icons } from "../lucide-icons.ts";

import type { IconProps } from "../types.ts";


function TerminalIcon({ size = 16, className }: IconProps) {
    return <Icons.SquareTerminal size={size} className={className} aria-hidden />;
}

function GlobeIcon({ size = 16, className }: IconProps) {
    return <Icons.Globe size={size} className={className} aria-hidden />;
}

function ChipIcon({ size = 16, className }: IconProps) {
    return <Icons.Cpu size={size} className={className} aria-hidden />;
}

function PlayIcon({ size = 16, className }: IconProps) {
    return <Icons.Play size={size} className={className} aria-hidden />;
}

export { TerminalIcon, GlobeIcon, ChipIcon, PlayIcon };

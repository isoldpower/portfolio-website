import { Icons } from "../lucide-icons.ts";

import type { IconProps } from "../types.ts";


function BackIcon({ size = 16, className }: IconProps) {
    return <Icons.ArrowLeft size={size} className={className} aria-hidden />;
}

function ExternalLinkIcon({ size = 14, className }: IconProps) {
    return <Icons.ArrowUpRight size={size} className={className} aria-hidden />;
}

function ChevronRightIcon({ size = 14, className }: IconProps) {
    return <Icons.ChevronRight size={size} className={className} aria-hidden />;
}

export { BackIcon, ExternalLinkIcon, ChevronRightIcon };

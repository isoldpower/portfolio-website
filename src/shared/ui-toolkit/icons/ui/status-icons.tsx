import { Icons } from "../lucide-icons.ts";

import type { IconProps } from "../types.ts";


function CheckIcon({ size = 14, className }: IconProps) {
    return <Icons.Check size={size} className={className} aria-hidden />;
}

function CopyIcon({ size = 14, className }: IconProps) {
    return <Icons.Copy size={size} className={className} aria-hidden />;
}

function LockIcon({ size = 14, className }: IconProps) {
    return <Icons.Lock size={size} className={className} aria-hidden />;
}

function AlertIcon({ size = 16, className }: IconProps) {
    return <Icons.AlertTriangle size={size} className={className} aria-hidden />;
}

export { CheckIcon, CopyIcon, LockIcon, AlertIcon };

import { Icons } from "../lucide-icons.ts";

import type { IconProps } from "../types.ts";


function MonitorIcon({ size = 16, className }: IconProps) {
    return <Icons.Monitor size={size} className={className} aria-hidden />;
}

function NetworkIcon({ size = 16, className }: IconProps) {
    return <Icons.Network size={size} className={className} aria-hidden />;
}

function ServerIcon({ size = 16, className }: IconProps) {
    return <Icons.Server size={size} className={className} aria-hidden />;
}

function WorkflowIcon({ size = 16, className }: IconProps) {
    return <Icons.Workflow size={size} className={className} aria-hidden />;
}

function ActivityIcon({ size = 16, className }: IconProps) {
    return <Icons.Activity size={size} className={className} aria-hidden />;
}

function DatabaseIcon({ size = 16, className }: IconProps) {
    return <Icons.Database size={size} className={className} aria-hidden />;
}

function ZapIcon({ size = 16, className }: IconProps) {
    return <Icons.Zap size={size} className={className} aria-hidden />;
}

function BookLockIcon({ size = 16, className }: IconProps) {
    return <Icons.BookLock size={size} className={className} aria-hidden />;
}

function SearchIcon({ size = 16, className }: IconProps) {
    return <Icons.Search size={size} className={className} aria-hidden />;
}

function LayersIcon({ size = 16, className }: IconProps) {
    return <Icons.Layers size={size} className={className} aria-hidden />;
}

function PlugIcon({ size = 16, className }: IconProps) {
    return <Icons.Plug size={size} className={className} aria-hidden />;
}

function TelescopeIcon({ size = 16, className }: IconProps) {
    return <Icons.Telescope size={size} className={className} aria-hidden />;
}

function CloudIcon({ size = 16, className }: IconProps) {
    return <Icons.Cloud size={size} className={className} aria-hidden />;
}

export {
    MonitorIcon,
    NetworkIcon,
    ServerIcon,
    WorkflowIcon,
    ActivityIcon,
    DatabaseIcon,
    ZapIcon,
    BookLockIcon,
    SearchIcon,
    LayersIcon,
    PlugIcon,
    TelescopeIcon,
    CloudIcon
};

import {
    ActivityIcon,
    BookLockIcon,
    CloudIcon,
    DatabaseIcon,
    LayersIcon,
    MonitorIcon,
    NetworkIcon,
    PlugIcon,
    SearchIcon,
    ServerIcon,
    TelescopeIcon,
    WorkflowIcon,
    ZapIcon
} from "@shared/ui-toolkit/icons";

import type { FinanceNodeType } from "@entities/integration/model";
import type { IconProps } from "@shared/ui-toolkit/icons";
import type { FunctionComponent } from "react";


const ICON_BY_NODE_TYPE: Record<FinanceNodeType, FunctionComponent<IconProps>> = {
    "client": MonitorIcon,
    "gateway": NetworkIcon,
    "service": ServerIcon,
    "worker": WorkflowIcon,
    "stream-processor": ActivityIcon,
    "database": DatabaseIcon,
    "cache": ZapIcon,
    "ledger": BookLockIcon,
    "search": SearchIcon,
    "topic": LayersIcon,
    "connector": PlugIcon,
    "observability": TelescopeIcon,
    "external": CloudIcon,
};

function resolveNodeIcon(type: FinanceNodeType): FunctionComponent<IconProps> {
    return ICON_BY_NODE_TYPE[type];
}

export { resolveNodeIcon };

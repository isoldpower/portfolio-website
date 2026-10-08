import { useState, useSyncExternalStore } from "react";

import { NodeAnchorRegistry } from "./NodeAnchorRegistry.ts";

import type { AnchorSnapshot } from "./NodeAnchorRegistry.ts";


interface UseNodeAnchorsReturn {
    registry: NodeAnchorRegistry;
    anchors: AnchorSnapshot;
}

function createRegistry(): NodeAnchorRegistry {
    return new NodeAnchorRegistry();
}

function useNodeAnchors(): UseNodeAnchorsReturn {
    const [registry] = useState(createRegistry);
    const anchors = useSyncExternalStore(registry.subscribe, registry.getSnapshot, registry.getServerSnapshot);

    return { registry, anchors };
}

export { useNodeAnchors };

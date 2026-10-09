import { useMemo, useState, useSyncExternalStore } from "react";
import { NodeAnchorRegistry } from "./NodeAnchorRegistry.ts";

import type { AnchorSnapshot } from "./types.ts";


interface UseNodeAnchorsReturn {
    registry: NodeAnchorRegistry;
    anchors: AnchorSnapshot;
}

const useNodeAnchors = (): UseNodeAnchorsReturn => {
    const [registry] = useState(() => new NodeAnchorRegistry());
    const anchors = useSyncExternalStore(
        registry.subscribe,
        registry.getSnapshot,
        registry.getServerSnapshot
    );

    return useMemo(() => ({ registry, anchors }), [registry, anchors]);
};

export { useNodeAnchors };
export type { UseNodeAnchorsReturn };

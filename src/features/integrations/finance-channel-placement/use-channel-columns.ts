import { useCallback, useMemo } from "react";

import type { ChannelColumn, ChannelDraft } from "./types.ts";


const useChannelColumns = (drafts: ChannelDraft[]): ChannelColumn[] => {
    const assignColumns = useCallback(() => {
        return [...drafts]
            .sort((left, right) => {
                return right.connectionCount - left.connectionCount || left.top - right.top;
            })
            .map((draft): ChannelColumn => {
                return {
                    drafts: [draft],
                    bottom: draft.top + draft.height,
                    width: draft.width,
                };
            });
    }, [drafts]);

    return useMemo(() => {
        return assignColumns();
    }, [assignColumns]);
};

export { useChannelColumns };

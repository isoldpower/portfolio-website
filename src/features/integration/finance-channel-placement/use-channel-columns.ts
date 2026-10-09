import { useCallback, useMemo } from "react";
import { CHANNEL_GAP } from "./constants.ts";

import type { ChannelColumn, ChannelDraft } from "./types.ts";


const useChannelColumns = (drafts: ChannelDraft[]): ChannelColumn[] => {
    const packColumns = useCallback(() => {
        const columns: ChannelColumn[] = [];
        const sortedDrafts = [...drafts].sort((left, right) => {
            return left.top - right.top;
        });

        for (const draft of sortedDrafts) {
            let column = columns.find((candidate) => {
                return candidate.bottom + CHANNEL_GAP <= draft.top;
            });

            if (column === undefined) {
                column = { drafts: [], bottom: -Infinity, width: 0 };
                columns.push(column);
            }

            column.drafts.push(draft);
            column.bottom = draft.top + draft.height;
            column.width = Math.max(column.width, draft.width);
        }

        return columns;
    }, [drafts]);

    return useMemo(() => {
        return packColumns();
    }, [packColumns]);
};

export { useChannelColumns };

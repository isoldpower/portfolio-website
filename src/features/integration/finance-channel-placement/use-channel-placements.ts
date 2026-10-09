import { useCallback, useMemo } from "react";
import { COLUMN_GAP } from "./constants.ts";
import { useChannelColumns } from "./use-channel-columns.ts";
import { useChannelDrafts } from "./use-channel-drafts.ts";

import type { ChannelDraft } from "./types.ts";
import type { UseChannelDraftsParams } from "./use-channel-drafts.ts";
import type { FinanceChannelPlacement, FinanceInfraChannelPlacements } from "@entities/integration/model";


const NO_DRAFTS: ChannelDraft[] = [];

const useChannelPlacements = (params: UseChannelDraftsParams): FinanceInfraChannelPlacements => {
    const drafts = useChannelDrafts(params);
    const columns = useChannelColumns(drafts?.channels ?? NO_DRAFTS);

    const placeColumns = useCallback(() => {
        const placements = new Map<string, FinanceChannelPlacement>();

        if (drafts === null) {
            return placements;
        }

        let offsetX = 0;
        for (const column of columns) {
            for (const draft of column.drafts) {
                placements.set(draft.channelId, {
                    x: offsetX,
                    y: draft.top - drafts.sectionTop,
                    direction: draft.direction,
                    inflow: draft.direction === "top-to-bottom" ? "top" : "bottom",
                });
            }

            offsetX += column.width + COLUMN_GAP;
        }

        return placements;
    }, [drafts, columns]);

    return useMemo(() => {
        return placeColumns();
    }, [placeColumns]);
};

export { useChannelPlacements };

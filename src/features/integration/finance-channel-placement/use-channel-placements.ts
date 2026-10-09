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
    const sharedColumns = useChannelColumns(drafts?.shared ?? NO_DRAFTS);
    const dedicatedColumns = useChannelColumns(drafts?.dedicated ?? NO_DRAFTS);

    const placeColumns = useCallback(() => {
        const placements = new Map<string, FinanceChannelPlacement>();

        if (drafts === null) {
            return placements;
        }

        let offsetX = 0;

        for (const column of [...sharedColumns, ...dedicatedColumns]) {
            for (const draft of column.drafts) {
                placements.set(draft.channelId, {
                    x: offsetX,
                    y: draft.top - drafts.sectionTop,
                    inflow: draft.inflow,
                });
            }

            offsetX += column.width + COLUMN_GAP;
        }

        return placements;
    }, [drafts, sharedColumns, dedicatedColumns]);

    return useMemo(() => placeColumns(), [placeColumns]);
};

export { useChannelPlacements };

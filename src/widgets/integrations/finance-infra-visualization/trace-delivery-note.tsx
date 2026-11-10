import { InfoHint } from "@shared/ui-toolkit";

import type { FC } from "react";


const TraceDeliveryNote: FC = () => {
    return (
        <InfoHint>
            <InfoHint.Trigger label="About trace accuracy" />
            <InfoHint.Content>
                This visualization is streamed over Server-Sent Events with at-most-once delivery:
                spans lost along the way (reconnects, slow connections, backend restarts) are never resent.
                Because of that, what you see here is not guaranteed to be complete or accurate at any given moment.
            </InfoHint.Content>
        </InfoHint>
    );
};


export { TraceDeliveryNote };

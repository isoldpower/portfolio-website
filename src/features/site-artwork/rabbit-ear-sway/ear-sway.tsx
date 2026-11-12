import { useEarSway } from "./sway/use-ear-sway.ts";

import type { UseEarSwayParams } from "./sway/use-ear-sway.ts";


type EarSwayProps = UseEarSwayParams;

function EarSway(props: EarSwayProps) {
    useEarSway(props);

    return null;
}

export { EarSway };
export type { EarSwayProps };

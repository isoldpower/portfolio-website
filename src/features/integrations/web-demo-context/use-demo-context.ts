import { use } from "react";
import { DemoContext } from "./provider";

import type { DemoContextPayload } from "./types.ts";


function useDemoContext(): DemoContextPayload {
    const context = use(DemoContext);

    if (!context) {
        throw new Error("Tried accessing useDemoContext out of DemoContext bound.");
    }

    return context;
}

export { useDemoContext };
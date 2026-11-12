import { RegisterAnimation } from "@shared/lib/components";

import type { AnimationDescriptor } from "@shared/lib/components";


const CALLOUT_BOB: AnimationDescriptor = {
    id: "callout-bob",
    className: "animate-callout-bob motion-reduce:animate-none",
};

function CalloutBob() {
    return <RegisterAnimation {...CALLOUT_BOB} />;
}

export { CalloutBob };

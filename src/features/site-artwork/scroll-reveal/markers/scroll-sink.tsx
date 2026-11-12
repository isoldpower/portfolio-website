import { RegisterAnimation } from "@shared/lib/components";
import { REVEAL_MARKERS } from "../constants.ts";


function ScrollSink() {
    return (
        <RegisterAnimation
            id="scroll-reveal"
            className={REVEAL_MARKERS.sink}
        />
    );
}

export { ScrollSink };

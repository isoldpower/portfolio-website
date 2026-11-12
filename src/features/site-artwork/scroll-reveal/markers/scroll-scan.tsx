import { RegisterAnimation } from "@shared/lib/components";
import { REVEAL_MARKERS } from "../constants.ts";


function ScrollScan() {
    return (
        <RegisterAnimation
            id="scroll-reveal"
            className={REVEAL_MARKERS.scan}
        />
    );
}

export { ScrollScan };

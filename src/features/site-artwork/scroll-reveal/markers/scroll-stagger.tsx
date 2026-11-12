import { RegisterAnimation } from "@shared/lib/components";
import { REVEAL_MARKERS } from "../constants.ts";


function ScrollStagger() {
    return (
        <RegisterAnimation
            id="scroll-reveal"
            className={REVEAL_MARKERS.stagger}
        />
    );
}

export { ScrollStagger };

import { RegisterAnimation } from "@shared/lib/components";
import { REVEAL_MARKERS } from "../constants.ts";


function ScrollRise() {
    return (
        <RegisterAnimation
            id="scroll-reveal"
            className={REVEAL_MARKERS.rise}
        />
    );
}

export { ScrollRise };

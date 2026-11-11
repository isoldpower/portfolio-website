import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";

import type { AnimationDescriptor } from "@shared/lib/components";


const JOURNEY_BUTTON_HOVER: AnimationDescriptor = {
    id: "journey-button-hover",
    className: cn(
        "transition-colors duration-150 ease-[steps(2)]",
        "hover:bg-accent/15 hover:text-highlight"
    ),
};

function JourneyButtonHover() {
    return <RegisterAnimation {...JOURNEY_BUTTON_HOVER} />;
}

export { JourneyButtonHover };

import { RegisterAnimation } from "@shared/lib/components";

import type { AnimationDescriptor } from "@shared/lib/components";


const ANIMATION: AnimationDescriptor = {
    id: "intro-progress-fade",
    className: "transition-opacity duration-300",
};

function ProgressFade() {
    return (
        <RegisterAnimation {...ANIMATION} />
    );
}

export { ProgressFade };

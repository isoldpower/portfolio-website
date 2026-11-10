import { RegisterAnimation } from "@shared/lib/components";

import type { AnimationDescriptor } from "@shared/lib/components";


const CURSOR_BLINK: AnimationDescriptor = {
    id: "cursor-blink",
    className: "animate-blink motion-reduce:animate-none",
};

function CursorBlink() {
    return <RegisterAnimation {...CURSOR_BLINK} />;
}

export { CursorBlink };

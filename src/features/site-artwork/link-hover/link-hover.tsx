import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";

import type { AnimationDescriptor } from "@shared/lib/components";


const LINK_HOVER: AnimationDescriptor = {
    id: "link-hover",
    className: cn(
        "underline-offset-4 transition-colors duration-150 ease-[steps(2)]",
        "hover:text-highlight hover:underline"
    ),
};

function LinkHover() {
    return <RegisterAnimation {...LINK_HOVER} />;
}

export { LinkHover };

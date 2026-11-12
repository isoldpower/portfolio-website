import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function FocusOutline() {
    return (
        <RegisterAnimation
            id="focus-outline"
            className={cn(
                "outline-none focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-accent",
                "focus-visible:outline-offset-2"
            )}
        />
    );
}

function InsetFocusOutline() {
    return (
        <RegisterAnimation
            id="focus-outline"
            className={cn(
                "outline-none focus-visible:outline-1 focus-visible:outline-dashed focus-visible:outline-accent",
                "focus-visible:-outline-offset-1"
            )}
        />
    );
}

export { FocusOutline, InsetFocusOutline };

import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function CursorBlink() {
    return (
        <RegisterAnimation
            id="cursor-blink"
            className={cn("animate-blink motion-reduce:animate-none")}
        />
    );
}

export { CursorBlink };

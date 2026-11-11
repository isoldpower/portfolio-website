import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function SceneryBlink() {
    return (
        <RegisterAnimation
            id="scenery-blink"
            className={cn("animate-[blink_var(--blink-duration,1.4s)_steps(1)_infinite] motion-reduce:animate-none")}
        />
    );
}

export { SceneryBlink };

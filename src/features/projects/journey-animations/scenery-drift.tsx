import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function SceneryDrift() {
    return (
        <RegisterAnimation
            id="scenery-drift"
            className={cn("animate-journey-drift motion-reduce:animate-none")}
        />
    );
}

export { SceneryDrift };

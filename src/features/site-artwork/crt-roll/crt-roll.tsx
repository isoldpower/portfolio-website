import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function CrtRoll() {
    return (
        <RegisterAnimation
            id="crt-roll"
            className={cn("motion-safe:animate-crt-roll motion-reduce:hidden")}
        />
    );
}

export { CrtRoll };

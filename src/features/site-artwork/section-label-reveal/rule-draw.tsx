import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function RuleDraw() {
    return (
        <RegisterAnimation
            id="rule-draw"
            className={cn("transition-[clip-path] duration-900 ease-[steps(40,end)] motion-reduce:transition-none")}
        />
    );
}

export { RuleDraw };

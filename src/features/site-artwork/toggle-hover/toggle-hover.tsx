import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function ToggleHover() {
    return (
        <RegisterAnimation
            id="toggle-hover"
            className={cn(
                "cursor-pointer aria-pressed:cursor-default",
                "transition-colors duration-150 ease-[steps(2)]",
                "not-aria-pressed:hover:text-highlight not-aria-pressed:hover:underline"
            )}
        />
    );
}

export { ToggleHover };

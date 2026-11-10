import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function NavigationHover() {
    return (
        <RegisterAnimation
            id="navigation-hover"
            className={cn(
                "transition-colors duration-150 ease-[steps(2)]",
                "hover:bg-accent/12 hover:text-highlight",
                "in-focus-visible:bg-accent/12 in-focus-visible:text-highlight",
                "after:absolute after:inset-x-1.5 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-highlight lg:after:inset-x-2",
                "after:transition-transform after:duration-250 after:ease-[steps(6)]",
                "hover:after:scale-x-100"
            )}
        />
    );
}

export { NavigationHover };

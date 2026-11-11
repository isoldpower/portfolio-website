import { RegisterAnimation } from "@shared/lib/components";
import { cn } from "@shared/lib/utilities";


function SkipLinkHover() {
    return (
        <RegisterAnimation
            id="skip-link-hover"
            className={cn(
                "underline-offset-4 transition-colors duration-150 ease-[steps(2)]",
                "hover:text-external hover:underline focus-visible:text-external focus-visible:underline"
            )}
        />
    );
}

export { SkipLinkHover };

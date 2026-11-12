import { useMemo } from "react";
import { cn } from "@shared/lib/utilities";
import { RegisterAnimation } from "@shared/lib/components";
import { useIntroSnapshot } from "../stage/use-intro-snapshot.ts";


function IntroHandoff() {
    const { phase } = useIntroSnapshot();
    const isHidden = useMemo(() => {
        return ["load", "type", "morph", "fly"].includes(phase);
    }, [phase]);

    return (
        <RegisterAnimation
            id="intro-visibility"
            className={cn(
                isHidden && "opacity-0 animate-intro-unhide"
            )}
        />
    );
}

export { IntroHandoff };

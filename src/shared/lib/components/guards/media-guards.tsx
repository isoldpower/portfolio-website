import { cn } from "@shared/lib/utilities";
import { useCallback } from "react";

import type { HTMLAttributes } from "react";


type ScreenKind = "mobile" | "tablet" | "laptop" | "desktop";

const HIDDEN_ON_SCREEN: Record<ScreenKind, string> = {
    mobile: "max-md:hidden",
    tablet: "md:max-lg:hidden",
    laptop: "lg:max-xl:hidden",
    desktop: "xl:hidden",
};

interface MediaGuardProps extends HTMLAttributes<HTMLDivElement> {
    screens: readonly ScreenKind[];
}

type ScreenGuardProps = Omit<MediaGuardProps, "screens">;

function MediaGuard({
    screens,
    className,
    children,
    ...props
}: MediaGuardProps) {
    const hiddenOn = useCallback((): string[] => {
        return (Object.keys(HIDDEN_ON_SCREEN) as ScreenKind[])
            .filter((screen) => !screens.includes(screen))
            .map((screen) => HIDDEN_ON_SCREEN[screen]);
    }, [screens]);

    return (
        <div className={cn("contents", hiddenOn(), className)} {...props}>
            {children}
        </div>
    );
}

function MobileOnly(props: ScreenGuardProps) {
    return <MediaGuard screens={["mobile"]} {...props} />;
}

function TabletOnly(props: ScreenGuardProps) {
    return <MediaGuard screens={["tablet"]} {...props} />;
}

function LaptopOnly(props: ScreenGuardProps) {
    return <MediaGuard screens={["laptop"]} {...props} />;
}

function DesktopOnly(props: ScreenGuardProps) {
    return <MediaGuard screens={["desktop"]} {...props} />;
}

function HandheldOnly(props: ScreenGuardProps) {
    return <MediaGuard screens={["mobile", "tablet"]} {...props} />;
}

function ComputerOnly(props: ScreenGuardProps) {
    return <MediaGuard screens={["laptop", "desktop"]} {...props} />;
}

export {
    MediaGuard,
    MobileOnly,
    TabletOnly,
    LaptopOnly,
    DesktopOnly,
    HandheldOnly,
    ComputerOnly
};
export type { ScreenKind, MediaGuardProps, ScreenGuardProps };

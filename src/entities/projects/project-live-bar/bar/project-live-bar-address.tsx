import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectLiveBarAddressProps {
    label: ReactNode;
    children: string;
}

const ProjectLiveBarAddress: FC<ProjectLiveBarAddressProps> = ({ label, children }) => {
    return (
        <span className="flex min-w-0 items-center gap-2">
            <span aria-hidden="true" className="size-2 shrink-0 bg-positive" />
            <Text family="mono" size="2xs" uppercase className="tracking-[2px] text-foreground/80">
                {label}
            </Text>
            <Text family="mono" size="xs" tone="accent" truncate>
                {children}
            </Text>
        </span>
    );
};

ProjectLiveBarAddress.displayName = "ProjectLiveBarAddress";

export { ProjectLiveBarAddress };
export type { ProjectLiveBarAddressProps };

import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectPageSidebarHeaderProps {
    kicker: ReactNode;
    children: ReactNode;
}

const ProjectPageSidebarHeader: FC<ProjectPageSidebarHeaderProps> = ({
    kicker,
    children
}) => {
    return (
        <header className="flex flex-col gap-1 max-lg:order-first border-b border-accent px-5 py-6">
            <Text as="p" family="mono" size="xs" tone="strong" className="m-0 opacity-80">
                {kicker}
            </Text>
            <Text
                as="h1"
                size="xl"
                weight="bold"
                tone="accent"
                className="m-0 leading-tight wrap-break-word lg:text-2xl"
            >
                {children}
            </Text>
        </header>
    );
};

ProjectPageSidebarHeader.displayName = "ProjectPageSidebarHeader";

export { ProjectPageSidebarHeader };
export type { ProjectPageSidebarHeaderProps };

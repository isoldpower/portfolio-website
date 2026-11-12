import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectPageSidebarSectionProps {
    title: ReactNode;
    children: ReactNode;
}

const ProjectPageSidebarSection: FC<ProjectPageSidebarSectionProps> = ({ title, children }) => {
    return (
        <section className="flex flex-col gap-2">
            <Text as="h2" size="md" weight="bold" tone="accent" className="m-0">
                {title}
            </Text>
            <Text as="p" family="mono" size="sm" tone="strong" className="m-0 leading-[1.7] whitespace-pre-line">
                {children}
            </Text>
        </section>
    );
};

ProjectPageSidebarSection.displayName = "ProjectPageSidebarSection";

export { ProjectPageSidebarSection };
export type { ProjectPageSidebarSectionProps };

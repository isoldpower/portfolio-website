import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectRepoCardListProps {
    title: ReactNode;
    children: ReactNode;
}

const ProjectRepoCardList: FC<ProjectRepoCardListProps> = ({ title, children }) => {
    return (
        <section className="flex flex-col gap-2 border-b border-accent px-5 py-6">
            <Text as="h2" size="md" weight="bold" tone="accent" className="m-0">
                {title}
            </Text>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
                {children}
            </ul>
        </section>
    );
};

ProjectRepoCardList.displayName = "ProjectRepoCardList";

export { ProjectRepoCardList };
export type { ProjectRepoCardListProps };

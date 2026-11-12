import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ExperienceTreeGroupProps {
    command: string;
    children: ReactNode;
}

const ExperienceTreeGroup: FC<ExperienceTreeGroupProps> = ({ command, children }) => {
    return (
        <div className="flex flex-col gap-3">
            <Text as="p" className="font-mono text-sm text-foreground">
                {command}
            </Text>
            <ol className="m-0 flex list-none flex-col gap-3 p-0">
                {children}
            </ol>
        </div>
    );
};

ExperienceTreeGroup.displayName = "ExperienceTreeGroup";

export { ExperienceTreeGroup };
export type { ExperienceTreeGroupProps };

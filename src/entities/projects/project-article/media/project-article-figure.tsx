import { Text } from "@shared/ui-toolkit/typography";

import type { FC, ReactNode } from "react";


interface ProjectArticleFigureProps {
    caption?: ReactNode;
    children: ReactNode;
}

const ProjectArticleFigure: FC<ProjectArticleFigureProps> = ({ caption, children }) => {
    return (
        <figure className="m-0 flex flex-col gap-2">
            <div className="overflow-hidden border border-accent bg-background">
                {children}
            </div>
            {caption && (
                <Text as="figcaption" family="mono" size="xs" className="text-foreground/75">
                    {caption}
                </Text>
            )}
        </figure>
    );
};

ProjectArticleFigure.displayName = "ProjectArticleFigure";

export { ProjectArticleFigure };
export type { ProjectArticleFigureProps };

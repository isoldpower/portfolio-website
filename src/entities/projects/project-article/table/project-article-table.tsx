import type { FC, ReactNode } from "react";
import {cn} from "@shared/lib/utilities";


interface ProjectArticleTableProps {
    children: ReactNode;
}

const ProjectArticleTable: FC<ProjectArticleTableProps> = ({ children }) => {
    return (
        <div className="overflow-x-auto">
            <table
                className={cn(
                    "w-full border-collapse text-sm [&_td]:border [&_td]:border-accent/40",
                    "[&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-accent/40 [&_th]:bg-surface",
                    "[&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-accent")}
            >
                {children}
            </table>
        </div>
    );
};

ProjectArticleTable.displayName = "ProjectArticleTable";

export { ProjectArticleTable };
export type { ProjectArticleTableProps };

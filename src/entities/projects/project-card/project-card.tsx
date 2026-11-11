import { cn } from "@shared/lib/utilities";

import { ProjectCardAction } from "./card/project-card-action.tsx";
import { ProjectCardDescription } from "./card/project-card-description.tsx";
import { ProjectCardImage } from "./card/project-card-image.tsx";
import { ProjectCardKind } from "./card/project-card-kind.tsx";
import { ProjectCardPlaceholderNote } from "./card/project-card-placeholder-note.tsx";
import { ProjectCardPlaceholderTitle } from "./card/project-card-placeholder-title.tsx";
import { ProjectCardPlaceholder } from "./card/project-card-placeholder.tsx";
import { ProjectCardPreview } from "./card/project-card-preview.tsx";
import { ProjectCardTech } from "./card/project-card-tech.tsx";
import { ProjectCardTitle } from "./card/project-card-title.tsx";

import type { ProjectCardActionProps } from "./card/project-card-action.tsx";
import type { ProjectCardDescriptionProps } from "./card/project-card-description.tsx";
import type { ProjectCardImageProps } from "./card/project-card-image.tsx";
import type { ProjectCardKindProps } from "./card/project-card-kind.tsx";
import type { ProjectCardPlaceholderNoteProps } from "./card/project-card-placeholder-note.tsx";
import type { ProjectCardPlaceholderTitleProps } from "./card/project-card-placeholder-title.tsx";
import type { ProjectCardPlaceholderProps } from "./card/project-card-placeholder.tsx";
import type { ProjectCardPreviewProps } from "./card/project-card-preview.tsx";
import type { ProjectCardTechProps } from "./card/project-card-tech.tsx";
import type { ProjectCardTitleProps } from "./card/project-card-title.tsx";
import type { FC, ReactNode } from "react";


interface ProjectCardProps {
    isFiller?: boolean;
    children: ReactNode;
}

type ProjectCardObject = FC<ProjectCardProps> & {
    Preview: FC<ProjectCardPreviewProps>;
    Image: FC<ProjectCardImageProps>;
    Placeholder: FC<ProjectCardPlaceholderProps>;
    PlaceholderTitle: FC<ProjectCardPlaceholderTitleProps>;
    PlaceholderNote: FC<ProjectCardPlaceholderNoteProps>;
    Kind: FC<ProjectCardKindProps>;
    Title: FC<ProjectCardTitleProps>;
    Description: FC<ProjectCardDescriptionProps>;
    Tech: FC<ProjectCardTechProps>;
    Action: FC<ProjectCardActionProps>;
};

const ProjectCard: ProjectCardObject = ({ isFiller = false, children }) => {
    return (
        <li
            aria-hidden={isFiller || undefined}
            inert={isFiller}
            className={cn("min-w-0", isFiller && "invisible max-sm:hidden")}
        >
            <article className="flex h-full flex-col gap-3 border border-accent bg-background p-4">
                {children}
            </article>
        </li>
    );
};

ProjectCard.Preview = ProjectCardPreview;
ProjectCard.Image = ProjectCardImage;
ProjectCard.Placeholder = ProjectCardPlaceholder;
ProjectCard.PlaceholderTitle = ProjectCardPlaceholderTitle;
ProjectCard.PlaceholderNote = ProjectCardPlaceholderNote;
ProjectCard.Kind = ProjectCardKind;
ProjectCard.Title = ProjectCardTitle;
ProjectCard.Description = ProjectCardDescription;
ProjectCard.Tech = ProjectCardTech;
ProjectCard.Action = ProjectCardAction;
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
export type { ProjectCardProps };

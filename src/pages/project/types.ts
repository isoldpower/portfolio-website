import type { ProjectDetails, ProjectNeighbors } from "@entities/projects/model";


interface ProjectPageData {
    project: ProjectDetails;
    neighbors: ProjectNeighbors;
}

export type { ProjectPageData };

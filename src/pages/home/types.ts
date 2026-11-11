import type { ProjectPreview } from "@entities/projects/model";
import type { AboutProfile } from "@entities/site-artwork/model";


interface HomePageData {
    projects: ProjectPreview[];
    about: AboutProfile | null;
}

export type { HomePageData };

import { useTranslation } from "react-i18next";

import { ProjectBrowser } from "@entities/projects/project-browser";
import { ProjectBrowserProvider } from "@features/projects/project-browser";
import { ProjectBrowserFilters } from "@widgets/projects/project-browser-filters";
import { ProjectBrowserGrid } from "@widgets/projects/project-browser-grid";
import { ProjectBrowserPagination } from "@widgets/projects/project-browser-pagination";
import { SectionHeading } from "@widgets/site-artwork/section-heading";

import { BROWSER_SECTION_ID } from "./constants.ts";

import type { ProjectCard } from "@entities/projects/model";


interface ProjectBrowserSectionProps {
    projects: readonly ProjectCard[];
}

function ProjectBrowserSection({ projects }: ProjectBrowserSectionProps) {
    const { t } = useTranslation();

    return (
        <ProjectBrowserProvider projects={projects} scrollTargetId={BROWSER_SECTION_ID}>
            <ProjectBrowser id={BROWSER_SECTION_ID} className="mt-20 md:mt-24">
                <SectionHeading text={t("browser.label")} />
                <ProjectBrowserFilters />
                <ProjectBrowserGrid />
                <ProjectBrowserPagination />
            </ProjectBrowser>
        </ProjectBrowserProvider>
    );
}

export { ProjectBrowserSection };
export type { ProjectBrowserSectionProps };

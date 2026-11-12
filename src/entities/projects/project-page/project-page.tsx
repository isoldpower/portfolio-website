import { cn } from "@shared/lib/utilities";

import { ProjectPageSidebar } from "./layout/project-page-sidebar.tsx";
import { ProjectPageSidebarHeader } from "./sidebar/project-page-sidebar-header.tsx";
import { ProjectPageSidebarGroup } from "./sidebar/project-page-sidebar-group.tsx";
import { ProjectPageSidebarSection } from "./sidebar/project-page-sidebar-section.tsx";
import { ProjectPageMain } from "./layout/project-page-main.tsx";
import { ProjectPageScroll } from "./layout/project-page-scroll.tsx";
import { ProjectPageIntro } from "./main/project-page-intro.tsx";
import { ProjectPageContent } from "./main/project-page-content.tsx";
import { ProjectPagePager } from "./main/project-page-pager.tsx";
import { ProjectPagePagerLabel } from "./main/project-page-pager-label.tsx";

import type { ProjectPageSidebarProps } from "./layout/project-page-sidebar.tsx";
import type { ProjectPageSidebarHeaderProps } from "./sidebar/project-page-sidebar-header.tsx";
import type { ProjectPageSidebarGroupProps } from "./sidebar/project-page-sidebar-group.tsx";
import type { ProjectPageSidebarSectionProps } from "./sidebar/project-page-sidebar-section.tsx";
import type { ProjectPageMainProps } from "./layout/project-page-main.tsx";
import type { ProjectPageScrollProps } from "./layout/project-page-scroll.tsx";
import type { ProjectPageIntroProps } from "./main/project-page-intro.tsx";
import type { ProjectPageContentProps } from "./main/project-page-content.tsx";
import type { ProjectPagePagerProps } from "./main/project-page-pager.tsx";
import type { ProjectPagePagerLabelProps } from "./main/project-page-pager-label.tsx";
import type { FC, ReactNode } from "react";


interface ProjectPageProps {
    children: ReactNode;
}

type ProjectPageObject = FC<ProjectPageProps> & {
    Sidebar: FC<ProjectPageSidebarProps>;
    SidebarHeader: FC<ProjectPageSidebarHeaderProps>;
    SidebarGroup: FC<ProjectPageSidebarGroupProps>;
    SidebarSection: FC<ProjectPageSidebarSectionProps>;
    Main: FC<ProjectPageMainProps>;
    Scroll: FC<ProjectPageScrollProps>;
    Intro: FC<ProjectPageIntroProps>;
    Content: FC<ProjectPageContentProps>;
    Pager: FC<ProjectPagePagerProps>;
    PagerLabel: FC<ProjectPagePagerLabelProps>;
};

const ProjectPage: ProjectPageObject = ({ children }) => {
    return (
        <div
            className={cn(
                "relative mx-[calc(50%-50vw)] grid lg:h-[calc(100dvh-var(--spacing-header)-var(--spacing-footer))]",
                "lg:overflow-hidden lg:grid-cols-[minmax(17rem,22%)_minmax(0,1fr)]"
            )}
        >
            {children}
        </div>
    );
};

ProjectPage.Sidebar = ProjectPageSidebar;
ProjectPage.SidebarHeader = ProjectPageSidebarHeader;
ProjectPage.SidebarGroup = ProjectPageSidebarGroup;
ProjectPage.SidebarSection = ProjectPageSidebarSection;
ProjectPage.Main = ProjectPageMain;
ProjectPage.Scroll = ProjectPageScroll;
ProjectPage.Intro = ProjectPageIntro;
ProjectPage.Content = ProjectPageContent;
ProjectPage.Pager = ProjectPagePager;
ProjectPage.PagerLabel = ProjectPagePagerLabel;
ProjectPage.displayName = "ProjectPage";

export { ProjectPage };
export type { ProjectPageProps };

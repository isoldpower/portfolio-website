import { cn } from "@shared/lib/utilities";

import { ProjectBrowserField } from "./filters/project-browser-field.tsx";
import { ProjectBrowserFilters } from "./filters/project-browser-filters.tsx";
import { ProjectBrowserLabel } from "./filters/project-browser-label.tsx";
import { ProjectBrowserOption } from "./filters/project-browser-option.tsx";
import { ProjectBrowserReset } from "./filters/project-browser-reset.tsx";
import { ProjectBrowserSearchInput } from "./filters/project-browser-search-input.tsx";
import { ProjectBrowserSelect } from "./filters/project-browser-select.tsx";
import { ProjectBrowserPageButton } from "./pagination/project-browser-page-button.tsx";
import { ProjectBrowserPagination } from "./pagination/project-browser-pagination.tsx";
import { ProjectBrowserEmpty } from "./results/project-browser-empty.tsx";
import { ProjectBrowserGrid } from "./results/project-browser-grid.tsx";
import { ProjectBrowserStatus } from "./results/project-browser-status.tsx";

import type { ProjectBrowserFieldProps } from "./filters/project-browser-field.tsx";
import type { ProjectBrowserFiltersProps } from "./filters/project-browser-filters.tsx";
import type { ProjectBrowserLabelProps } from "./filters/project-browser-label.tsx";
import type { ProjectBrowserOptionProps } from "./filters/project-browser-option.tsx";
import type { ProjectBrowserResetProps } from "./filters/project-browser-reset.tsx";
import type { ProjectBrowserSearchInputProps } from "./filters/project-browser-search-input.tsx";
import type { ProjectBrowserSelectProps } from "./filters/project-browser-select.tsx";
import type { ProjectBrowserPageButtonProps } from "./pagination/project-browser-page-button.tsx";
import type { ProjectBrowserPaginationProps } from "./pagination/project-browser-pagination.tsx";
import type { ProjectBrowserEmptyProps } from "./results/project-browser-empty.tsx";
import type { ProjectBrowserGridProps } from "./results/project-browser-grid.tsx";
import type { ProjectBrowserStatusProps } from "./results/project-browser-status.tsx";
import type { FC, HTMLAttributes } from "react";


type ProjectBrowserProps = HTMLAttributes<HTMLElement>;

type ProjectBrowserObject = FC<ProjectBrowserProps> & {
    Filters: FC<ProjectBrowserFiltersProps>;
    Field: FC<ProjectBrowserFieldProps>;
    Label: FC<ProjectBrowserLabelProps>;
    SearchInput: FC<ProjectBrowserSearchInputProps>;
    Select: FC<ProjectBrowserSelectProps>;
    Option: FC<ProjectBrowserOptionProps>;
    Reset: FC<ProjectBrowserResetProps>;
    Status: FC<ProjectBrowserStatusProps>;
    Grid: FC<ProjectBrowserGridProps>;
    Empty: FC<ProjectBrowserEmptyProps>;
    Pagination: FC<ProjectBrowserPaginationProps>;
    PageButton: FC<ProjectBrowserPageButtonProps>;
};

const ProjectBrowser: ProjectBrowserObject = ({ className, ...props }) => {
    return (
        <section className={cn("relative z-10 flex flex-col gap-6", className)} {...props} />
    );
};

ProjectBrowser.Filters = ProjectBrowserFilters;
ProjectBrowser.Field = ProjectBrowserField;
ProjectBrowser.Label = ProjectBrowserLabel;
ProjectBrowser.SearchInput = ProjectBrowserSearchInput;
ProjectBrowser.Select = ProjectBrowserSelect;
ProjectBrowser.Option = ProjectBrowserOption;
ProjectBrowser.Reset = ProjectBrowserReset;
ProjectBrowser.Status = ProjectBrowserStatus;
ProjectBrowser.Grid = ProjectBrowserGrid;
ProjectBrowser.Empty = ProjectBrowserEmpty;
ProjectBrowser.Pagination = ProjectBrowserPagination;
ProjectBrowser.PageButton = ProjectBrowserPageButton;
ProjectBrowser.displayName = "ProjectBrowser";

export { ProjectBrowser };
export type { ProjectBrowserProps };

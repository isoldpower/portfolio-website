import { ProjectBrowser } from "@entities/projects/project-browser";
import { FocusOutline } from "@features/site-artwork/focus-outline";
import { AnimationComposer } from "@shared/lib/components";

import type { BrowserFilterOption } from "@features/projects/project-browser";
import type { ChangeEvent } from "react";


interface ProjectBrowserSelectFieldProps {
    selectId: string;
    labelText: string;
    selectedValue: string;
    filterOptions: readonly BrowserFilterOption[];
    onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function ProjectBrowserSelectField({
    selectId,
    labelText,
    selectedValue,
    filterOptions,
    onSelectChange,
}: ProjectBrowserSelectFieldProps) {
    return (
        <ProjectBrowser.Field>
            <ProjectBrowser.Label htmlFor={selectId}>
                {labelText}
            </ProjectBrowser.Label>
            <AnimationComposer>
                <FocusOutline />
                <ProjectBrowser.Select id={selectId} value={selectedValue} onChange={onSelectChange}>
                    {filterOptions.map((filterOption) => (
                        <ProjectBrowser.Option key={filterOption.value} value={filterOption.value}>
                            {filterOption.label}
                        </ProjectBrowser.Option>
                    ))}
                </ProjectBrowser.Select>
            </AnimationComposer>
        </ProjectBrowser.Field>
    );
}

export { ProjectBrowserSelectField };
export type { ProjectBrowserSelectFieldProps };

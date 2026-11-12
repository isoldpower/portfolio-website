import type { FC, OptionHTMLAttributes } from "react";


type ProjectBrowserOptionProps = OptionHTMLAttributes<HTMLOptionElement>;

const ProjectBrowserOption: FC<ProjectBrowserOptionProps> = (props) => {
    return (
        <option className="bg-background text-accent" {...props} />
    );
};

ProjectBrowserOption.displayName = "ProjectBrowserOption";

export { ProjectBrowserOption };
export type { ProjectBrowserOptionProps };

import type {FC, IframeHTMLAttributes} from "react";


interface ProjectFrameProps extends Omit<
    IframeHTMLAttributes<HTMLIFrameElement>,
    'width' | 'height' | 'className'
> {}

const ProjectFrame: FC<ProjectFrameProps> = ({
    ...props
}) => {
    return (
        <iframe
            width="100%"
            height="800px"
            className="border-4 border-gray-700"
            {...props}
        />
    );
}

export { ProjectFrame };
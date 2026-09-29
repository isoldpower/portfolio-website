import Github from "/images/github-mark.svg?url";
import type { OverrideIconProps } from "./icon";


type GithubIconProps = OverrideIconProps;

function GithubIcon({
    width = "auto",
    height = "auto",
    size,
    ...props
}: GithubIconProps) {
    return (
        <img
            src={Github}
            alt="GitHub icon"
            width={size ?? width}
            height={size ?? height}
            {...props}
        />
    );
}

export { GithubIcon };
import { getRouteApi } from "@tanstack/react-router";

import { ProjectHeader } from "./project-header.tsx";
import { ProjectShowcase } from "./project-showcase.tsx";


const routeApi = getRouteApi("/projects/$slug");

function ProjectPage() {
    const project = routeApi.useLoaderData();

    return (
        <main>
            <ProjectHeader project={project} />
            <ProjectShowcase project={project} />
        </main>
    );
}

export { ProjectPage };

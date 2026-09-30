import { createFileRoute } from "@tanstack/react-router";

import { ProjectPage, projectPageLoader } from "@pages/project";


export const Route = createFileRoute("/projects/$slug")({
    component: ProjectPage,
    loader: ({ params }) => projectPageLoader({ slug: params.slug }),
    head: ({ loaderData }) => ({
        meta: [
            { title: loaderData ? `${loaderData.title} | Portfolio` : "Portfolio" },
        ],
    }),
});

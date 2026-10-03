import { createFileRoute } from "@tanstack/react-router";

import {
    projectHeadersLoader,
    projectHeadLoader,
    ProjectPage,
    projectPageLoader
} from "@pages/project";

import { createPageElement } from "../page-utility.tsx";

import type { FC } from "react";


const ProjectPageElement: FC = createPageElement("/projects/$slug", ProjectPage);

export const Route = createFileRoute("/projects/$slug")({
    component: ProjectPageElement,
    loader: projectPageLoader,
    head: projectHeadLoader,
    headers: projectHeadersLoader,
});

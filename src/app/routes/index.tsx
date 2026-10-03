import { createFileRoute } from "@tanstack/react-router";

import { HomePage, homePageLoader } from "@pages/home";

import { createPageElement } from "../page-utility.tsx";

import type { FC } from "react";


const HomePageElement: FC = createPageElement("/", HomePage);

export const Route = createFileRoute("/")({
    component: HomePageElement,
    loader: homePageLoader,
});

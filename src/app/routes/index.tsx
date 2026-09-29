import { createFileRoute } from "@tanstack/react-router";

import { HomePage, homePageLoader } from "@pages/home";

export const Route = createFileRoute("/")({
    component: HomePage,
    loader: homePageLoader,
});

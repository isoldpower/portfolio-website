import { listProjectsPreviews } from "@features/project";


async function homePageLoader() {
    const projects = await listProjectsPreviews({ order: "desc" });

    return { projects };
}

export { homePageLoader };

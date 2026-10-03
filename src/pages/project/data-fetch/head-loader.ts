import type { ProjectPageData } from "@pages/project/types.ts";


interface ProjectHeadLoaderParams {
    loaderData?: ProjectPageData | undefined;
}

const projectHeadLoader = ({
   loaderData
}: ProjectHeadLoaderParams) => ({
    meta: [{
        title: loaderData ? `${loaderData.project.title} | Portfolio` : "Portfolio"
    }]
});

export { projectHeadLoader };
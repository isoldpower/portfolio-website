import { CROSS_ORIGIN_ISOLATION_HEADERS, PAGE_CACHE_HEADERS } from "@shared/lib/http";

import type { ProjectPageData } from "@pages/project/types.ts";
import type { ResponseHeaders } from "@shared/lib/http";


interface ProjectHeadersLoaderParams {
    loaderData?: ProjectPageData | undefined;
}

const projectHeadersLoader = ({
    loaderData
}: ProjectHeadersLoaderParams): ResponseHeaders => {
    if (loaderData?.project.kind === "terminal") {
        return { ...PAGE_CACHE_HEADERS, ...CROSS_ORIGIN_ISOLATION_HEADERS };
    }

    return PAGE_CACHE_HEADERS;
};

export { projectHeadersLoader };

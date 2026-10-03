import { PAGE_CACHE_HEADERS } from "@shared/lib/http";

import type { ResponseHeaders } from "@shared/lib/http";


const homeHeadersLoader = (): ResponseHeaders => {
    return PAGE_CACHE_HEADERS;
};

export { homeHeadersLoader };

import { QueryClient } from "@tanstack/react-query";


function createQueryClient(): QueryClient {
    return new QueryClient();
}

export { createQueryClient };

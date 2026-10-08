import type { ApiServers } from "./providers/api-servers";
import type { QueryClient } from "@tanstack/react-query";


interface RouterContext {
    apiServers: ApiServers;
    queryClient: QueryClient;
}

export type { RouterContext };

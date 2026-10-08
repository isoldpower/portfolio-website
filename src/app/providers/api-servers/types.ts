import type { IntegrationApiServers } from "@features/integration/api";
import type { ProjectApiServers } from "@features/project/api";


type ApiServers = ProjectApiServers & IntegrationApiServers;

export type { ApiServers };

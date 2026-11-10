import type { IntegrationApiServers } from "@features/integrations/api";
import type { ProjectApiServers } from "@features/projects/api";


type ApiServers = ProjectApiServers & IntegrationApiServers;

export type { ApiServers };

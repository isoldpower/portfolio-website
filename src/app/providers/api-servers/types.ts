import type { IntegrationApiServers } from "@features/integrations/api";
import type { TranslationApiServers } from "@features/localization/translation-overrides";
import type { AboutApiServers } from "@features/site-artwork/about-profile";
import type { ProjectApiServers } from "@features/projects/api";


type ApiServers = ProjectApiServers & IntegrationApiServers & AboutApiServers & TranslationApiServers;

export type { ApiServers };

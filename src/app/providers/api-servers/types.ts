import type { IntegrationApiServers } from "@features/integrations/api";
import type { TranslationApiServers } from "@features/localization/translation-overrides";
import type { ProjectApiServers } from "@features/projects/api";
import type { JourneyApiServers } from "@features/projects/portfolio-journey";
import type { AboutApiServers } from "@features/site-artwork/about-profile";
import type { ExperienceApiServers } from "@features/site-artwork/experience-section";


type ApiServers =
    ProjectApiServers &
    IntegrationApiServers &
    AboutApiServers &
    ExperienceApiServers &
    JourneyApiServers &
    TranslationApiServers;

export type { ApiServers };

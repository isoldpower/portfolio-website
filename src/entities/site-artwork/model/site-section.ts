const SITE_SECTIONS = [
    "about",
    "experience",
    "portfolio",
    "project-browser",
    "contacts"
] as const;

type SiteSection = (typeof SITE_SECTIONS)[number];

export { SITE_SECTIONS };
export type { SiteSection };

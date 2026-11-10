const SITE_SECTIONS = [
    "about",
    "experience",
    "portfolio",
    "contacts"
] as const;

type SiteSection = (typeof SITE_SECTIONS)[number];

export { SITE_SECTIONS };
export type { SiteSection };

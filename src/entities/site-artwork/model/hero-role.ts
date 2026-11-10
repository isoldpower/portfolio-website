const HERO_ROLES = ["backend", "frontend", "fullstack"] as const;

type HeroRole = (typeof HERO_ROLES)[number];

export { HERO_ROLES };
export type { HeroRole };

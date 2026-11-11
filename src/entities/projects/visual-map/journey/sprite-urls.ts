import type { JourneyTheme } from "../../model";


interface ThemeSprites {
    far: string;
    nearA: string;
    nearB: string;
    mid: string;
    height: number;
    blinkSeconds: number;
}

interface ThemeSpriteSource {
    prefix: string;
    height: number;
    blinkSeconds: number;
}

const SPRITE_ROOT = "/images/journey";
const SPRITE_EXTENSION = ".png";
const PATH_SEPARATOR = "/";
const NAME_SEPARATOR = "-";

const spriteUrl = (name: string): string => {
    return [SPRITE_ROOT, name + SPRITE_EXTENSION].join(PATH_SEPARATOR);
};

const themeSpriteUrl = (prefix: string, layer: string): string => {
    return spriteUrl([prefix, layer].join(NAME_SEPARATOR));
};

const toThemeSprites = ({ prefix, height, blinkSeconds }: ThemeSpriteSource): ThemeSprites => {
    return {
        far: themeSpriteUrl(prefix, "far"),
        nearA: themeSpriteUrl(prefix, "near-a"),
        nearB: themeSpriteUrl(prefix, "near-b"),
        mid: themeSpriteUrl(prefix, "mid"),
        height,
        blinkSeconds,
    };
};

const FINANCE_SOURCE: ThemeSpriteSource = { prefix: "fin", height: 133, blinkSeconds: 1.4 };
const WARSHIPS_SOURCE: ThemeSpriteSource = { prefix: "ws", height: 133, blinkSeconds: 2.2 };
const NETWORK_SOURCE: ThemeSpriteSource = { prefix: "usp", height: 150, blinkSeconds: 1.2 };

const JOURNEY_SPRITES = {
    clouds: spriteUrl("clouds"),
    ground: spriteUrl("ground"),
    rabbitIdle: spriteUrl("rabbit-idle"),
    rabbitRun: spriteUrl("rabbit-run"),
} as const;

const THEME_SPRITES: Record<JourneyTheme, ThemeSprites> = {
    finance: toThemeSprites(FINANCE_SOURCE),
    warships: toThemeSprites(WARSHIPS_SOURCE),
    network: toThemeSprites(NETWORK_SOURCE),
};

export { JOURNEY_SPRITES, THEME_SPRITES };
export type { ThemeSprites };

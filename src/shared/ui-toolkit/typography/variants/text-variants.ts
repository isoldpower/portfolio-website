/*
 * Every visual option a piece of text can take, as a closed set of Tailwind classes.
 * Components pick from these keys and never write their own text classes, so the
 * whole typographic scale can be retuned here without touching a single component.
 */

const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
} as const;

const textFamilyClasses = {
    sans: "",
    display: "font-display",
    mono: "font-mono",
} as const;

const textWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
} as const;

const textToneClasses = {
    default: "",
    strong: "text-foreground",
    muted: "text-muted",
    subtle: "text-subtle",
    accent: "text-accent",
    positive: "text-positive",
    negative: "text-negative",
    inverted: "text-background",
} as const;

const textTrackingClasses = {
    tight: "tracking-tight",
    normal: "",
    wide: "tracking-wide",
    wider: "tracking-wider",
    widest: "tracking-widest",
} as const;

const textLeadingClasses = {
    none: "leading-none",
    tight: "leading-tight",
    snug: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
} as const;

type TextSize = keyof typeof textSizeClasses;
type TextFamily = keyof typeof textFamilyClasses;
type TextWeight = keyof typeof textWeightClasses;
type TextTone = keyof typeof textToneClasses;
type TextTracking = keyof typeof textTrackingClasses;
type TextLeading = keyof typeof textLeadingClasses;

export {
    textSizeClasses,
    textFamilyClasses,
    textWeightClasses,
    textToneClasses,
    textTrackingClasses,
    textLeadingClasses
};
export type { TextSize, TextFamily, TextWeight, TextTone, TextTracking, TextLeading };

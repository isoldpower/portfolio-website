const IMAGE_SIZES: readonly number[] = [
    16, 24, 32, 48, 64, 96, 128, 256, 320, 480, 640, 768, 960, 1280, 1600, 1920, 2560,
];

const SIZE_VALUES = new Set(IMAGE_SIZES.map(String));
const RECT_PATTERN = /^\d{1,5},\d{1,5},\d{1,5},\d{1,5}$/;
const FOCAL_POINT_PATTERN = /^(0(\.\d{1,4})?|1(\.0{1,4})?)$/;

const ALLOWED_VALUES: Record<string, ReadonlySet<string> | RegExp> = {
    "w": SIZE_VALUES,
    "h": SIZE_VALUES,
    "fit": new Set(["clip", "crop", "fill", "fillmax", "max", "scale", "min"]),
    "crop": new Set(["top", "bottom", "left", "right", "center", "focalpoint", "entropy"]),
    "auto": new Set(["format"]),
    "fm": new Set(["jpg", "pjpg", "png", "webp", "avif"]),
    "q": new Set(["60", "75", "90", "100"]),
    "dpr": new Set(["1", "2", "3"]),
    "rect": RECT_PATTERN,
    "fp-x": FOCAL_POINT_PATTERN,
    "fp-y": FOCAL_POINT_PATTERN,
};

function isAllowedValue(name: string, value: string): boolean {
    const allowed = ALLOWED_VALUES[name];
    if (allowed === undefined) {
        return false;
    }

    return allowed instanceof RegExp ? allowed.test(value) : allowed.has(value);
}

function areImageParametersAllowed(parameters: URLSearchParams): boolean {
    const names = [...parameters.keys()];
    if (new Set(names).size !== names.length) {
        return false;
    }

    return [...parameters.entries()].every(([name, value]) => isAllowedValue(name, value));
}

export { IMAGE_SIZES, areImageParametersAllowed };

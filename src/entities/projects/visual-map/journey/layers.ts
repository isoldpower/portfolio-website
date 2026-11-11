const JOURNEY_LAYERS = {
    clouds: { height: 72, parallax: 0.12 },
    far: { parallax: 0.3 },
    near: { parallax: 0.55 },
    mid: { height: 150, parallax: 1 },
    ground: { height: 10, parallax: 1 },
} as const;

export { JOURNEY_LAYERS };

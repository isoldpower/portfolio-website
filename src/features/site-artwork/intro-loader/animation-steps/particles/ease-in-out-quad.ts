const easeInOutQuad = (time: number): number => {
    return time < 0.5
        ? 2 * time * time
        : 1 - Math.pow(-2 * time + 2, 2) / 2;
};

export { easeInOutQuad };

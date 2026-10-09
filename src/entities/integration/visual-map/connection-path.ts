import type { FinanceInfraAnchor, FinanceInfraPort, FinanceInfraPortSide } from "@entities/integration/model";


const MIN_REACH = 24;
const MAX_REACH = 160;
const REACH_RATIO = 0.45;

function rightOf(anchor: FinanceInfraAnchor): number {
    return anchor.x + anchor.width;
}

function portOf(anchor: FinanceInfraAnchor, side: FinanceInfraPortSide): FinanceInfraPort {
    switch (side) {
        case "left":
            return {
                x: anchor.x,
                y: anchor.y + anchor.height / 2,
                directionX: -1,
                directionY: 0
            };
        case "right":
            return {
                x: rightOf(anchor),
                y: anchor.y + anchor.height / 2,
                directionX: 1,
                directionY: 0
            };
        case "top":
            return {
                x: anchor.x + anchor.width / 2,
                y: anchor.y,
                directionX: 0,
                directionY: -1
            };
        case "bottom":
            return {
                x: anchor.x + anchor.width / 2,
                y: anchor.y + anchor.height,
                directionX: 0,
                directionY: 1
            };
    }
}

function sideFacing(anchor: FinanceInfraAnchor, target: FinanceInfraPort): FinanceInfraPortSide {
    return target.x < anchor.x ? "left"
        : target.x > rightOf(anchor)
            ? "right"
            : target.y < anchor.y
                ? "top"
                : "bottom";
}

function sidesBetween(
    from: FinanceInfraAnchor,
    to: FinanceInfraAnchor
): [FinanceInfraPortSide, FinanceInfraPortSide] {
    if (rightOf(from) <= to.x) {
        return ["right", "left"];
    } else if (rightOf(to) <= from.x) {
        return ["left", "right"];
    } else if (from.y + from.height <= to.y) {
        return ["bottom", "top"];
    } else if (to.y + to.height <= from.y) {
        return ["top", "bottom"];
    }

    return ["right", "right"];
}

function fallbackReachOf(from: FinanceInfraPort, to: FinanceInfraPort): number {
    const distance = Math.hypot(to.x - from.x, to.y - from.y);

    return Math.min(
        MAX_REACH,
        Math.max(MIN_REACH, distance * REACH_RATIO)
    );
}

function isHorizontal(port: FinanceInfraPort): boolean {
    return port.directionX !== 0;
}

function reachOf(port: FinanceInfraPort, other: FinanceInfraPort, fallback: number): number {
    const ahead = isHorizontal(port)
        ? (other.x - port.x) * port.directionX
        : (other.y - port.y) * port.directionY;

    if (ahead <= 0) {
        return fallback;
    }

    return isHorizontal(port) === isHorizontal(other)
        ? ahead / 2
        : ahead;
}

function controlOf(port: FinanceInfraPort, reach: number): [number, number] {
    return [port.x + port.directionX * reach, port.y + port.directionY * reach];
}

function portPath(from: FinanceInfraPort, to: FinanceInfraPort): string {
    const fallback = fallbackReachOf(from, to);
    const [fromControlX, fromControlY] = controlOf(from, reachOf(from, to, fallback));
    const [toControlX, toControlY] = controlOf(to, reachOf(to, from, fallback));
    const points = [
        from.x, from.y,
        fromControlX, fromControlY,
        toControlX, toControlY,
        to.x, to.y,
    ].map(String);

    return `M ${points[0]} ${points[1]} C ${points[2]} ${points[3]}, ${points[4]} ${points[5]}, ${points[6]} ${points[7]}`;
}

export { portOf, portPath, sideFacing, sidesBetween };

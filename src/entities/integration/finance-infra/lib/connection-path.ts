import type { FinanceInfraAnchor, FinanceInfraPort, FinanceInfraPortSide } from "../model/types.ts";


const MIN_REACH = 24;
const MAX_REACH = 160;
const REACH_RATIO = 0.45;

function rightOf(anchor: FinanceInfraAnchor): number {
    return anchor.x + anchor.width;
}

function portOf(anchor: FinanceInfraAnchor, side: FinanceInfraPortSide): FinanceInfraPort {
    switch (side) {
        case "left":
            return { x: anchor.x, y: anchor.y + anchor.height / 2, directionX: -1, directionY: 0 };
        case "right":
            return { x: rightOf(anchor), y: anchor.y + anchor.height / 2, directionX: 1, directionY: 0 };
        case "top":
            return { x: anchor.x + anchor.width / 2, y: anchor.y, directionX: 0, directionY: -1 };
        case "bottom":
            return { x: anchor.x + anchor.width / 2, y: anchor.y + anchor.height, directionX: 0, directionY: 1 };
    }
}

function sideFacing(anchor: FinanceInfraAnchor, target: FinanceInfraPort): FinanceInfraPortSide {
    if (target.x < anchor.x) {
        return "left";
    }

    if (target.x > rightOf(anchor)) {
        return "right";
    }

    return target.y < anchor.y ? "top" : "bottom";
}

function sidesBetween(
    from: FinanceInfraAnchor,
    to: FinanceInfraAnchor
): [FinanceInfraPortSide, FinanceInfraPortSide] {
    if (rightOf(from) <= to.x) {
        return ["right", "left"];
    }

    if (rightOf(to) <= from.x) {
        return ["left", "right"];
    }

    return ["right", "right"];
}

function reachOf(from: FinanceInfraPort, to: FinanceInfraPort): number {
    const distance = Math.hypot(to.x - from.x, to.y - from.y);

    return Math.min(MAX_REACH, Math.max(MIN_REACH, distance * REACH_RATIO));
}

function portPath(from: FinanceInfraPort, to: FinanceInfraPort): string {
    const reach = reachOf(from, to);
    const points = [
        from.x, from.y,
        from.x + from.directionX * reach, from.y + from.directionY * reach,
        to.x + to.directionX * reach, to.y + to.directionY * reach,
        to.x, to.y,
    ].map(String);

    return `M ${points[0]} ${points[1]} C ${points[2]} ${points[3]}, ${points[4]} ${points[5]}, ${points[6]} ${points[7]}`;
}

export { portOf, portPath, sideFacing, sidesBetween };

import { HOLD_LENGTH, PANEL_APPROACH, PANEL_DEPART, SCROLL_PER_CAMERA, TRAVEL_LENGTH } from "../constants.ts";


const cameraTravelEnd = (stopCount: number): number => {
    return (stopCount + 1) * TRAVEL_LENGTH + stopCount * HOLD_LENGTH;
};

const pinnedScrollDistance = (stopCount: number): number => {
    return Math.round(cameraTravelEnd(stopCount) * SCROLL_PER_CAMERA);
};

const stopHoldStart = (stopIndex: number): number => {
    return TRAVEL_LENGTH + stopIndex * (TRAVEL_LENGTH + HOLD_LENGTH);
};

const stopHoldEnd = (stopIndex: number): number => {
    return stopHoldStart(stopIndex) + HOLD_LENGTH;
};

const stopHoldMiddle = (stopIndex: number): number => {
    return stopHoldStart(stopIndex) + HOLD_LENGTH / 2;
};

const cameraDistanceToStop = (cameraPosition: number, stopIndex: number): number => {
    return Math.max(0, stopHoldStart(stopIndex) - cameraPosition, cameraPosition - stopHoldEnd(stopIndex));
};

const isPanelLiveAt = (cameraPosition: number, stopIndex: number): boolean => {
    return cameraPosition >= stopHoldStart(stopIndex) - PANEL_APPROACH / 2
        && cameraPosition <= stopHoldEnd(stopIndex) + PANEL_DEPART / 2;
};

const checkpointTrackPosition = (stopIndex: number, stopCount: number): number => {
    return stopHoldStart(stopIndex) / cameraTravelEnd(stopCount);
};

export {
    cameraDistanceToStop,
    cameraTravelEnd,
    checkpointTrackPosition,
    isPanelLiveAt,
    pinnedScrollDistance,
    stopHoldEnd,
    stopHoldMiddle,
    stopHoldStart,
};

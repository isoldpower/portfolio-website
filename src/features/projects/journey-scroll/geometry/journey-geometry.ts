import { HOLD_LENGTH, PANEL_TRAVEL, SCROLL_PER_CAMERA, TRAVEL_LENGTH } from "../constants.ts";


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

const panelCameraOffset = (cameraPosition: number, stopIndex: number): number => {
    if (cameraPosition < stopHoldStart(stopIndex)) {
        return stopHoldStart(stopIndex) - cameraPosition;
    }

    return cameraPosition > stopHoldEnd(stopIndex) ? stopHoldEnd(stopIndex) - cameraPosition : 0;
};

const panelRestOffset = (stopIndex: number): number => {
    return Math.min(PANEL_TRAVEL, stopHoldStart(stopIndex));
};

const checkpointTrackPosition = (stopIndex: number, stopCount: number): number => {
    return stopHoldStart(stopIndex) / cameraTravelEnd(stopCount);
};

export {
    cameraDistanceToStop,
    cameraTravelEnd,
    checkpointTrackPosition,
    panelCameraOffset,
    panelRestOffset,
    pinnedScrollDistance,
    stopHoldEnd,
    stopHoldMiddle,
    stopHoldStart,
};

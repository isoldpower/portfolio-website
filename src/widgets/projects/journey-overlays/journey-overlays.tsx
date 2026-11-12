import { JourneyFinishOverlay } from "./overlays/journey-finish-overlay.tsx";
import { JourneyStartOverlay } from "./overlays/journey-start-overlay.tsx";


function JourneyOverlays() {
    return (
        <>
            <JourneyStartOverlay />
            <JourneyFinishOverlay />
        </>
    );
}

export { JourneyOverlays };

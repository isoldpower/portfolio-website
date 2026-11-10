import { RegisterAnimation } from "@shared/lib/components";

import type { AnimationDescriptor } from "@shared/lib/components";


const ANIMATION: AnimationDescriptor = {
    id: "intro-snapshot-scan",
    className: "transition-[clip-path] duration-800 ease-[steps(16,end)]",
};

function SnapshotScan() {
    return (
        <RegisterAnimation {...ANIMATION} />
    );
}

export { SnapshotScan };

import { SNAPSHOT_SLOT_EXTRA_HEIGHT } from "./constants.ts";
import { IntroRabbitSnapshotImage } from "./rabbit-snapshot/intro-rabbit-snapshot-image.tsx";

import type { IntroRabbitSnapshotImageProps } from "./rabbit-snapshot/intro-rabbit-snapshot-image.tsx";
import type { FC, ReactNode } from "react";


interface IntroRabbitSnapshotProps {
    width: number;
    height: number;
    children: ReactNode;
}

type IntroRabbitSnapshotObject = FC<IntroRabbitSnapshotProps> & {
    Image: FC<IntroRabbitSnapshotImageProps>;
};

const IntroRabbitSnapshot: IntroRabbitSnapshotObject = ({
    width,
    height,
    children
}) => {
    return (
        <div
            className="absolute top-full left-1/2"
            style={{
                width,
                height: height + SNAPSHOT_SLOT_EXTRA_HEIGHT,
                marginLeft: -width / 2 }}
        >
            {children}
        </div>
    );
};

IntroRabbitSnapshot.Image = IntroRabbitSnapshotImage;
IntroRabbitSnapshot.displayName = "IntroRabbitSnapshot";

export { IntroRabbitSnapshot };
export type { IntroRabbitSnapshotProps };

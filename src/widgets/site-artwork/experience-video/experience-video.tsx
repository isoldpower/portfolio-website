import { ExperienceBody } from "@entities/site-artwork/experience-body";
import { useLoopPlayback } from "@features/site-artwork/loop-playback";
import { ScrollScan } from "@features/site-artwork/scroll-reveal";
import { AnimationComposer } from "@shared/lib/components";


interface ExperienceVideoProps {
    src: string;
}

function ExperienceVideo({ src }: ExperienceVideoProps) {
    const playbackRef = useLoopPlayback();

    return (
        <AnimationComposer>
            <ScrollScan />
            <ExperienceBody.Video ref={playbackRef} src={src} />
        </AnimationComposer>
    );
}

export { ExperienceVideo };
export type { ExperienceVideoProps };

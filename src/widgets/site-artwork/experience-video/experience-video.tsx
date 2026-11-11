import { ExperienceBody } from "@entities/site-artwork/experience-body";
import { useLoopPlayback } from "@features/site-artwork/loop-playback";


interface ExperienceVideoProps {
    src: string;
}

function ExperienceVideo({ src }: ExperienceVideoProps) {
    const playbackRef = useLoopPlayback();

    return (
        <ExperienceBody.Video ref={playbackRef} src={src} />
    );
}

export { ExperienceVideo };
export type { ExperienceVideoProps };

import MuxPlayer from "@mux/mux-player-react/lazy";

import type { FC } from "react";


interface ProjectArticleVideoProps {
    playbackId: string;
    title: string;
    aspectRatio: string | null;
}

const ProjectArticleVideo: FC<ProjectArticleVideoProps> = ({ playbackId, title, aspectRatio }) => {
    return (
        <MuxPlayer
            playbackId={playbackId}
            loading="viewport"
            streamType="on-demand"
            metadata={{ video_title: title }}
            accentColor="#6699ff"
            primaryColor="#94a7cf"
            secondaryColor="#161a22"
            className="block w-full"
            style={{ aspectRatio: aspectRatio?.replace(":", " / ") ?? "16 / 9" }}
        />
    );
};

ProjectArticleVideo.displayName = "ProjectArticleVideo";

export { ProjectArticleVideo };
export type { ProjectArticleVideoProps };
